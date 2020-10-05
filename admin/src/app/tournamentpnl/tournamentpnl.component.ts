import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ReportsService } from '../services/reports.service';
import { SharedataService } from '../services/sharedata.service';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-tournamentpnl',
  templateUrl: './tournamentpnl.component.html',
  styleUrls: ['./tournamentpnl.component.css']
})
export class TournamentpnlComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  gridApi:any;
  gridColumnApi:any;
  paginationSetPageSize:number;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  userId: any;
  sportsList: any;
  sport:any=4;
  sportbfId: any;
  constructor(private getreports:ReportsService,private sharedata:SharedataService,private SportSettingdata:SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Tournament Name', field: 'tournamentName',sort: "asc", sortable: true, minWidth: 250,cellStyle: {'font-weight':'bolder'},lockPosition:true,suppressNavigable:true},
      {headerName: 'Profit & Loss', field: 'pNl', sortable: true, minWidth: 75,valueFormatter: numberWithCommas,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
      {headerName: 'Note', field: '', sortable: true, minWidth: 75},
    ]; 

    function numberWithCommas(params) {
        // var twodecimalvalue=parseFloat(params.value).toFixed(2);
        // var parts = twodecimalvalue.toString().split(".");
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return parts.join(".");
        var twodecimalvalue=parseFloat(params.value);
        var ans= twodecimalvalue.toLocaleString('en-IN',{ currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
        return ans;
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';
    
    this.gridOptions.paginationPageSize=50;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
  
  ngOnInit(){

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })
    this.sharedata.AccountInfoSource.subscribe(resp=>{
      if(resp!=null){
        this.userId=resp.userId
        this.getsportpnl();
      }
    })
    
  }

  getsportpnl(){
    this.sportbfId=this.sport;
    if(this.sportbfId==''){
      this.sportbfId=0;
    }
    this.getreports.GetTournamentPnl(this.userId,this.sportbfId).subscribe(resp=>{
      // console.log(resp)
      this.rowData=resp.data;
    })
  }

}
