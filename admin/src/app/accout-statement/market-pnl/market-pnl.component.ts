import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import {redirectComponent} from '../entry-component/redirect.component'
@Component({
  selector: 'app-market-pnl',
  templateUrl: './market-pnl.component.html',
  styleUrls: ['./market-pnl.component.css']
})
export class MarketPnlComponent implements OnInit {
  gridOptions: any;
  rowData;
  rowD;
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  defaultColDef: { sortable: boolean; };
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    };
    this.gridOptions.columnDefs = [
      {headerName: 'MDL username', field: 'username',sort: "desc",resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true,lockPosition:true,suppressNavigable:true,cellRendererFramework: redirectComponent},
      {headerName: 'Admin[X]', field: 'admin', sortable: true,resizable: true, minWidth: 100,width:150,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Sub [Y]', field: 'sub', sortable: true,resizable: true, minWidth: 100,width:150,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Total [X+Y]', field: 'total',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Amount [A]', field: 'amount',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'M-Comm [B]', field: 'mcomm',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'NetAMt [A+B]', field: 'netamt',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ];
    this.rowD = [
      {
        refid:"1",
        mdlid: "11",
        Mtid:"121",
        mktid:"1234",
        type:'0',
        username: "krish",
        admin: "0.00",
        sub: "22338.72",
        total: "22338.72",
        amount: "0.00",
        mcomm:"0.00",
        netamt:"0.00"
      },
     ];


    function numberWithCommas(params) {

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
   onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
   onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData=this.rowD
    this.gridApi.showLoadingOverlay();


  }
  ngOnInit() {
  }

}
