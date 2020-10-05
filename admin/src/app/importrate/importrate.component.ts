import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-importrate',
  templateUrl: './importrate.component.html',
  styleUrls: ['./importrate.component.css']
})
export class ImportrateComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs: any
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];


  sportsList = [];
  sport: any = "";
  tournamentList = [];
  tournament: any = "";
  matchList = [];
  match: any = "";
  marketList = [];
  market: any = "";
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;

  constructor(private sportService: SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = { context: { componentParent: this } };
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', width: 100, lockPosition: true, suppressNavigable: true },
      { headerName: 'Market Type', field: 'marketType', sortable: true, width: 100 },
      { headerName: 'Package Name', field: 'packageName', sortable: true, width: 100},
      { headerName: 'Market Name', field: 'marketInfo', sortable: true, width: 600, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Status', field: 'status', sortable: true, width: 100 },
      // { headerName: 'Setting', field: '', sortable: true, width: 100, cellRendererFramework: RatesnavigationComponent },
      // { headerName: 'Limit', field: 'limit', sortable: true, width: 100, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Active', field: 'active', width: 100, cellRendererFramework: ButtontogglecellComponent },
      // { headerName: 'Commission', field: 'commission', width: 100, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Bet Allow', field: 'betAllow', width: 100, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Chanel No', field: 'chanelNo', sortable: true, width: 100 },
      { headerName: 'Live', field: 'live', sortable: true, width: 100 },
      { headerName: 'Actions', field: '', sortable: true, width: 250, cellRendererFramework: CustomcellbuttonsComponent },
    ];

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function (params: any) {
      return 45;
    }
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = 'my-green-class';
    this.gridOptions.getRowClass = function (params: any) {
      if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
      }
    }
  }

  onPageSizeChanged(newPageSize: any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.GetSportList();
    this.GetImportRateList();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }


  GetSportList() {
    this.sportService.GetSportList().subscribe(data => {
      this.sportsList = data.tickerList;
    });
  }
  GetTournamentList() {
    if (!this.sport) {
      this.tournamentList = [];
      this.tournament = "";
      this.matchList = [];
      this.match = "";
      this.GetImportRateList();

      return;
    }
    let sportid = this.sport.betfairId;
    let isAll = 1;
    this.sportService.GetTournamentList(sportid, isAll).subscribe(data => {
      this.tournamentList = data.tournamentList;
    })
    this.GetImportRateList();
  }
  GetMatchList() {
    if (!this.tournament) {
      this.matchList = [];
      this.match = "";
      this.GetImportRateList();
      return;
    }

    let sportid = this.sport.betfairId;
    let tourid = this.tournament.betfairId;
    let isAll = 1;
    let status = "open";
    this.sportService.GetMatchList(sportid, tourid, isAll, status).subscribe(data => {
      this.matchList = data.matchList;
    })

    this.GetImportRateList();
  }

  getMarketList() {

    if (!this.match) {
      this.marketList = [];
      this.market = "";
      this.GetImportRateList();
      return;
    }


    let sportid = this.sport.betfairId;
    let tourid = this.tournament.betfairId;
    let matchid = this.match.id;

    let isall = 1;
    // let status = 1;
    let status = "open";

    this.sportService.GetMktList(sportid, tourid, matchid, isall, status).subscribe(data => {
      // console.log(data);
      this.marketList = data.marketList;
    }, err => {
      // console.log(err);
    })
    this.GetImportRateList();
  }

  GetImportRateList() {

    if (this.rowData.length == 0) {
      this.rowData = null;
    }

    let sportid = this.sport.betfairId;
    let tourid = this.tournament.betfairId;
    let matchid = this.match.id;
    let mktid = this.market.id;

    if (!this.sport) {
      sportid = 0;
    }
    if (!this.tournament) {
      tourid = 0;
    }
    if (!this.match) {
      matchid = 0;
    }
    if (!this.market) {
      mktid = 0;
    }

    this.sportService.GetImportRateList(sportid, tourid, matchid, mktid).subscribe(data => {
      console.log(data);
      this.rowData = data.data;
    })
  }

}
