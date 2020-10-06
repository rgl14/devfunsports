import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-inner-clientbet-history',
  templateUrl: './inner-clientbet-history.component.html',
  styleUrls: ['./inner-clientbet-history.component.css']
})
export class InnerClientbetHistoryComponent implements OnInit {
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
    this.gridOptions.columnDefs = [
      {headerName: 'date', field: 'date',resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Client info', field: 'cinfo',sort: "desc",resizable: true, sortable: true, minWidth: 150,width:300,suppressSizeToFit: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Market', field: 'market', sortable: true,resizable: true, minWidth: 250,width:500,suppressSizeToFit: true},
      {headerName: 'Runner Info', field: 'runnerinfo',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true},
      {headerName: 'C.Date', field: 'cdate',resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true},
      {headerName: 'M.Date', field: 'mdate',resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true},
      {headerName: 'Status', field: 'status',resizable: true, sortable: true, minWidth: 100},
      {headerName: 'W|L', field: 'wl',resizable: true, sortable: true, minWidth: 100},
      {headerName: 'Balance', field: 'balance',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ];
    this.rowD = [
      {
        date:'29/09/2020',
        clid: "21",
        Mtid:"221",
        mktid:"2234",
        type:'0',
        cinfo:'MDL:kriss[kriss] DL:Wasimbagan[Wasim786] Client:Wasim[Surah123]',
        market: "Cricket/Indian Premier League/Delhi Capitals v Sunrisers Hyderabad/Match Odds[1.173378424]	Runner:Sunrisers Hyderabad",
        runnerinfo: "Runner:Sunrisers Hyderabad Type:LAY Rate:1.39 Stake:2500 P|L:-975",
        cdate:"29-09-2020 10:15:44",
        mdate: "29-09-2020 10:15:44",
        status: "settled",
        wl:"Lost",
        balance:"-975"
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
