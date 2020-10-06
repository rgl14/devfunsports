import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import {redirectComponent} from '../entry-component/redirect.component'
@Component({
  selector: 'app-mdlwise-dlpnl',
  templateUrl: './mdlwise-dlpnl.component.html',
  styleUrls: ['./mdlwise-dlpnl.component.css']
})
export class MDLwiseDLpnlComponent implements OnInit {
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
      {headerName: 'DL username', field: 'dlusername',sort: "desc",resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true,lockPosition:true,suppressNavigable:true,cellRendererFramework: redirectComponent},
      {headerName: 'Admin[X]', field: 'admin', sortable: true,resizable: true, minWidth: 100,width:150,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'MDL [Y]', field: 'mdl', sortable: true,resizable: true, minWidth: 100,width:150,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'DL [Z]', field: 'dl',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Total [Z+Y+Z]', field: 'total',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Amount [A]', field: 'amount',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'M-Comm [B]', field: 'mcomm',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'NetAMt [A+B]', field: 'netamt',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ];
    this.rowD = [
      {
        dlid: "21",
        Mtid:"221",
        mktid:"2234",
        type:'0',
        dlusername: "simba",
        admin: "0.00",
        mdl: "0.00",
        dl:"22338.72",
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
