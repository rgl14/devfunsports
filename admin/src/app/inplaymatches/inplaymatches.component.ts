import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ReportsService } from '../services/reports.service';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { AnalysisFormatService } from '../services/analysis-format.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inplaymatches',
  templateUrl: './inplaymatches.component.html',
  styleUrls: ['./inplaymatches.component.css']
})
export class InplaymatchesComponent implements OnInit,OnDestroy {
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  gridOptions: GridOptions;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  analysissubscribe: Subscription;
  Allmatchdata: any;

  constructor(private getreports:ReportsService,private analysisservice:AnalysisSignalrService,private anlysisformat:AnalysisFormatService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', minWidth: 75, sortable: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Match Status', field: 'isInplay', minWidth: 100,valueGetter: valueFormatter,cellStyle: matchStatusStyle},
      {headerName: 'Title', field: 'name', sortable: true, minWidth: 300,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Sport', field: 'sportName', minWidth: 75},
      {headerName: 'Date', field: 'eventDate', sortable: true, minWidth: 125},
      // {headerName: 'Type', field: 'type', width: 150},
      // {headerName: 'Won By', field: 'wonBy', width: 200},
      // {headerName: 'Profit / Loss', field: 'pNl', width: 200, sortable: true,valueFormatter: balanceFormatter,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    function balanceFormatter(params){
      var twodecimalvalue=parseInt(params.value).toFixed(2);
      return twodecimalvalue;
    }
    function valueFormatter(params){
      // console.log(params.data.value)
      if(params.data.isInplay==1)
      { return "In-Play" }
      else{return "Upcoming"}
    }
    function matchStatusStyle(params){
      return {'font-weight':'bolder'};
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';


    this.gridOptions.paginationPageSize=100;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }
  
  onGridSizeChanged(params) {
      params.api.sizeColumnsToFit();
  }
  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.analysissubscribe=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        var allmatchesdatewise=this.anlysisformat.allMatchdateWiseFormat(resp);
        // this.Allmatchdata=this.anlysisformat.allMachDataListFormat(allmatchesdatewise);
        this.rowData=allmatchesdatewise;
      }
    })

  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
  }

  ngOnDestroy(){
    this.analysissubscribe.unsubscribe();
  }
}
