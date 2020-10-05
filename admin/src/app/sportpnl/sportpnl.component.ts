import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ReportsService } from '../services/reports.service';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-sportpnl',
  templateUrl: './sportpnl.component.html',
  styleUrls: ['./sportpnl.component.css']
})
export class SportpnlComponent implements OnInit {

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
  constructor(private getreports:ReportsService,private sharedata:SharedataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Sport Name', field: 'sportName',sort: "asc", sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'},lockPosition:true,suppressNavigable:true},
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

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  ngOnInit(){

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.sharedata.AccountInfoSource.subscribe(resp=>{
      if(resp!=null){
        this.userId=resp.userId
        this.getsportpnl(resp.userId);
      }
    })
    
  }

  getsportpnl(userid){
    this.getreports.GetSportsPnl(userid).subscribe(resp=>{
      // console.log(resp)
      this.rowData=resp.data;
    })
  }

}
