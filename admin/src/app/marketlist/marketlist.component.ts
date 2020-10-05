import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';
import { MarkettogglecellComponent } from '../markettogglecell/markettogglecell.component';

@Component({
  selector: 'app-marketlist',
  templateUrl: './marketlist.component.html',
  styleUrls: ['./marketlist.component.css']
})
export class MarketlistComponent implements OnInit {

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
  match="";
  status="";
  sportsList=[];
  tournamentList=[];
  matchList=[];
  statusList = [
    { key: '1', value: 'OPEN' },
    { key: '2', value: 'CURRENT' },
    { key: '4', value: 'SETTLED' },
    { key: '6', value: 'CLOSED' },
    { key: '5', value: 'INACTIVE' }
  ];
  sportbfId: any;
  statusvalue: any;
  TourBfId: any;
  MatchBfId: any;
  


  constructor(private SportSettingdata:SportDataService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Market Name', field: 'mktName', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Name', field: 'matchName', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Date', field: 'matchDate', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'marketStatus', sortable: true, width: 75,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Is Active', field: 'isActive', sortable: true, width: 100,cellRendererFramework:MarkettogglecellComponent},
      {headerName: 'Bet Allow', field: 'isAllowBet', sortable: true, width: 100,cellRendererFramework:MarkettogglecellComponent},
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
    this.SportSettingdata.GetMktList("0","0","0",1,"").subscribe(resp=>{
      this.rowData=resp.marketList;
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
    this.SportSettingdata.GetMktList(this.sportbfId,"0","0",1,"").subscribe(resp=>{
      this.rowData=resp.marketList;
    })
  }

  GetMatchList(sport,tournament){
    this.statusvalue="";
  this.sportbfId=sport.betfairId;
  if(this.sportbfId==undefined){
    this.sportbfId="0";
  }

  this.TourBfId=tournament.betfairId;
  if(this.TourBfId==undefined){
    this.TourBfId="0";
  }

  this.SportSettingdata.GetMatchList(this.sportbfId,this.TourBfId,1,this.statusvalue).subscribe(resp=>{
    this.matchList=resp.matchList;
  })
  this.SportSettingdata.GetMktList(this.sportbfId,this.TourBfId,"0",1,this.statusvalue).subscribe(resp=>{
    this.rowData=resp.marketList;
  })
}

GetMktList(sport,tournament,match,status){
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

  this.MatchBfId=match.betfairId;
  if(this.MatchBfId==undefined){
    this.MatchBfId="0";
  }
  this.SportSettingdata.GetMktList(this.sportbfId,this.TourBfId,this.MatchBfId,1,this.statusvalue).subscribe(resp=>{
    this.rowData=resp.marketList;
  })
}

}
