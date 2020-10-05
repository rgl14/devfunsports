import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-matchledger',
  templateUrl: './matchledger.component.html',
  styleUrls: ['./matchledger.component.css']
})
export class MatchledgerComponent implements OnInit {

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
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'dateTime', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Collection Name', field: 'collectionName', sortable: true, width: 500,cellStyle: {color: '#0084e7'}},
      {headerName: 'Debit', field: 'debit', sortable: true, width: 150,cellStyle: valuecssclass,valueFormatter: balanceFormatter,valueGetter: function(params) {if(params.data.debit==null){ return "--" }else{return params.data.debit}}},
      {headerName: 'Credit', field: 'credit', sortable: true, width: 150,cellStyle: valuecssclass,valueFormatter: balanceFormatter,valueGetter: function(params) {if(params.data.credit==null){ return "--" }else{return params.data.credit}}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 180,cellStyle:valuecssclass,valueFormatter: balanceFormatter},
      {headerName: 'Note', field: 'note', sortable: true, width: 270,valueGetter: function(params) {if(params.data.note==""){ return "--" }else{return params.data.note}}},
    ]; 

    function balanceFormatter(params){
      if(params.value!='--'){
        var twodecimalvalue=parseFloat(params.value);
        var ans= twodecimalvalue.toLocaleString('en-IN',{ currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
        return ans;
      }else{
        return params.value;
      }
    }

    function valuecssclass(params){
      console.log(params.column.colDef.field)
      let cellvaue=parseInt(params.value);
      if(params.column.colDef.field=='debit' || params.column.colDef.field=='credit'){
        if(cellvaue>=0){
          return {color: 'green'}
        }else{
          return {color: 'red'}
        }
      }else{
        if(cellvaue>=0){
          return {color: 'green',fontWeight:'bolder'}
        }else{
          return {color: 'red',fontWeight:'bolder'}
        }
      }
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

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  ngOnInit() {
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    // this.getreports.GetLedger(this.userId).subscribe(resp=>{
    //   this.rowData=resp.data;
    // })
  }

}
