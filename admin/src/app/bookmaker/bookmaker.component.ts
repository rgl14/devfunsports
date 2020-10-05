import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';
import { BookmakingService } from '../services/bookmaking.service';
import { SettingfancybookcellComponent } from '../settingfancybookcell/settingfancybookcell.component';

@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.css']
})
export class BookmakerComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs: any
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];

  statusList = [
    // { key: '', value: 'Select Status' },
    { key: '1', value: 'OPEN' },
    { key: '2', value: 'INACTIVE' },
    // { key: '3', value: 'SUSPENDED' },
    { key: '4', value: 'SETTLED' },
    { key: '6', value: 'CLOSED' }
  ];

  status: any = "";
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;

  constructor(private bmService: BookmakingService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = { context: { componentParent: this } };
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'bookCode', width: 100, lockPosition: true, suppressNavigable: true },
      { headerName: 'Book Type', field: 'bookType', sortable: true, width: 100, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Book Name', field: 'headerName', sortable: true, width: 200, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Match', field: 'matchName', sortable: true, width: 300, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Status', field: 'status', sortable: true, width: 100 },
      { headerName: 'Rate', field: '', sortable: true, width: 100, cellRendererFramework: RatesnavigationComponent },
      { headerName: 'Setting', field: '', sortable: true, width: 100, cellRendererFramework: SettingfancybookcellComponent },
      { headerName: 'Active', field: 'isActive', sortable: true, width: 100, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Bet Allow', field: 'isBetAllow', sortable: true, width: 100, cellRendererFramework: ButtontogglecellComponent },
      { headerName: 'Settle', field: '', sortable: true, width: 300, cellRendererFramework: NavigationcellComponent },
      { headerName: 'Actions', field: '', sortable: true, width: 350, cellRendererFramework: CustomcellbuttonsComponent },
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

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetBookList();
  }

  GetBookList() {
    let status = "";

    let isettled = 0;

    if (!this.status) {
      status = "";
    }
    if (this.status) {
      status = this.status.value;
      if (this.status.value === "SETTLED") {
        isettled = this.status.key;
      }
    }

    this.bmService.GetBookList(status, isettled).subscribe(data => {
      // console.log(data);
      this.rowData = data.data;
    })
  }

}
