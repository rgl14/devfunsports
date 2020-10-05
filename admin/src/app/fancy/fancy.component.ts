import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';
import { FancyService } from '../services/fancy.service';
import { SportDataService } from '../services/sport-data.service';
import { SettingfancybookcellComponent } from '../settingfancybookcell/settingfancybookcell.component';

@Component({
  selector: 'app-fancy',
  templateUrl: './fancy.component.html',
  styleUrls: ['./fancy.component.css']
})
export class FancyComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs: any
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];

  sportsList = [];
  tournamentList = [];
  matchList = [];
  statusList = [
    { key: '1', value: 'Open' },
    { key: '2', value: 'Inactive' },
    { key: '4', value: 'Settled' },
    { key: '6', value: 'Closed' }
  ];
  sport: any = "";
  tournament: any = "";
  match: any = "";
  status: any = "";
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  checked: boolean=false;

  constructor(private fancyService: FancyService, private sportService: SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {context: {componentParent: this}};

    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'fancyCode', minWidth: 50, lockPosition: true, suppressNavigable: true },
      { headerName: 'Fancy Type', field: 'fancyType', sortable: true, minWidth: 100, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Fancy Name', field: 'fancyName', sortable: true, minWidth: 225, cellStyle: { color: '#0084e7', 'font-weight': 'bolder' } },
      { headerName: 'Match', field: 'matchName', sortable: true, minWidth: 200, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Status', field: 'betStatus', sortable: true, minWidth: 100 },
      { headerName: 'Mode', field: 'automatic', sortable: true, minWidth: 175, cellRendererFramework: NavigationcellComponent },
      { headerName: 'Rate', field: 'rate', sortable: true, minWidth: 75, cellRendererFramework: RatesnavigationComponent },
      { headerName: 'Setting', field: 'setting', sortable: true, minWidth: 75, cellRendererFramework: SettingfancybookcellComponent },
      { headerName: 'Active', field: 'isActive', sortable: true, minWidth: 75, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Bet Allow', field: 'isBetAllow', sortable: true, minWidth: 75, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Result', field: 'result', sortable: true, minWidth: 75},
      { headerName: 'Actions', field: 'action', sortable: true, minWidth: 300, cellRendererFramework: CustomcellbuttonsComponent },
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
      return 50;
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

  showresult(show) {
    this.gridColumnApi.setColumnVisible("result", show);
  }

  showsettle(show) {
    this.gridColumnApi.setColumnsVisible(["rate", "setting", "isBetAllow","isActive"], show);
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    this.GetSportList();
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
      return;
    }
    let sportid = this.sport.betfairId;
    let isAll = 1;
    this.sportService.GetTournamentList(sportid, isAll).subscribe(data => {
      this.tournamentList = data.tournamentList;
    })
    this.GetFancyList();
  }
  GetMatchList() {
    if (!this.tournament) {
      this.matchList = [];
      this.match = "";
      return;
    }

    let sportid = this.sport.betfairId;
    let tourid = this.tournament.betfairId;
    let isAll = 1;
    let status = "open";
    this.sportService.GetMatchList(sportid, tourid, isAll, status).subscribe(data => {
      this.matchList = data.matchList;
    })

    this.GetFancyList();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetFancyList();
    this.showresult(false);
  }

 

  GetFancyList() {
    let sportid = this.sport.betfairId;
    let tourid = this.tournament.betfairId;
    let matchid = this.match.id;
    let status = this.status.value;
    

    if (!this.sport) {
      sportid = 0;
    }
    if (!this.tournament) {
      tourid = 0;
    }
    if (!this.match) {
      matchid = 0;
    }
    if (!this.status) {
      status = "";
    }
    if (this.checked) {
      var isettled = 1;
      this.showresult(true);
      this.showsettle(false);
    }else{
      var isettled = 0;
      this.showresult(false);
      this.showsettle(true);
    }

    this.fancyService.GetFancyList(sportid, tourid, matchid, status, isettled).subscribe(data => {
      // console.log(data);
      this.rowData = data.fancyList;
    })
  }

}
