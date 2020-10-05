import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';
import { CustomsporttogglecellComponent } from '../customsporttogglecell/customsporttogglecell.component';
import { MatchtogglecellComponent } from '../matchtogglecell/matchtogglecell.component';

@Component({
  selector: 'app-matchlist',
  templateUrl: './matchlist.component.html',
  styleUrls: ['./matchlist.component.css']
})
export class MatchlistComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  sport="";
  tournament="";
  status="";
  sportsList=[];
  tournamentList=[];
  statusList = [
    { key: '1', value: 'OPEN' },
    { key: '2', value: 'CURRENT' },
    { key: '4', value: 'SETTLED' },
    { key: '6', value: 'CLOSED' },
    { key: '5', value: 'INACTIVE' }
  ];
  sportbfId: string;
  TourBfId: string;
  statusvalue: string;

  
  constructor(private SportSettingdata:SportDataService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Match Name', field: 'matchName', sortable: true, width: 300,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Tournament Name', field: 'tournamentName', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Date', field: 'matchDate', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'matchStatus', sortable: true, width: 75,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Is Active', field: 'isActive', sortable: true, width: 100,cellRendererFramework:MatchtogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 350},
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
    this.SportSettingdata.GetMatchList("0","0",1,"").subscribe(resp=>{
      this.rowData=resp.matchList;
    })
  }

  GetTournamentList(sport){
    this.sportbfId=sport.betfairId;
    if(this.sportbfId==undefined){
      this.sportbfId="0";
    }
    this.SportSettingdata.GetTournamentList(this.sportbfId,1).subscribe(resp=>{
      this.tournamentList=resp.tournamentList;
    })
  }

  GetMatchList(sport,tournament,status){
    this.statusvalue=status.value;
    if(this.statusvalue==undefined || this.statusvalue==""){
      this.statusvalue="";
    }
    this.sportbfId=sport.betfairId;
    if(this.sportbfId==undefined){
      this.sportbfId="0";
    }

    this.TourBfId=tournament.betfairId;
    if(this.TourBfId==undefined){
      this.TourBfId="0";
    }

    this.SportSettingdata.GetMatchList(this.sportbfId,this.TourBfId,1,this.statusvalue).subscribe(resp=>{
      this.rowData=resp.matchList;
    })
  }
  

}
