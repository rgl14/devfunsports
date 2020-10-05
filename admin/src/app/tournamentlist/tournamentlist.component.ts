import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';
import { CustomsporttogglecellComponent } from '../customsporttogglecell/customsporttogglecell.component';
import { TournamenttogglecellComponent } from '../tournamenttogglecell/tournamenttogglecell.component';

@Component({
  selector: 'app-tournamentlist',
  templateUrl: './tournamentlist.component.html',
  styleUrls: ['./tournamentlist.component.css']
})
export class TournamentlistComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  sportsList=[];
  sport: any = "";
  sportbfId: string;

  constructor(private SportSettingdata:SportDataService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Sport Name', field: 'sportName', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Tournament Name', field: 'tournamentName', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Active', field: 'isActive', sortable: true, width: 75,cellRendererFramework:TournamenttogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 650,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';


    this.gridOptions.paginationPageSize=10;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function(params:any) {
      return 45;
    }
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = 'my-green-class';
    this.gridOptions.getRowClass = function(params:any) {
      if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
      }
    }
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.SportSettingdata.GetTournamentList("0",1).subscribe(resp=>{
      this.rowData=resp.tournamentList;
    })
  }

  GetTournamentList(){
    this.sportbfId=this.sport.betfairId
    if(this.sportbfId==undefined){
      this.sportbfId="0";
    }
    this.SportSettingdata.GetTournamentList(this.sportbfId,1).subscribe(resp=>{
      this.rowData=resp.tournamentList;
    })
  }

}
