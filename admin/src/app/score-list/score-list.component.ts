import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { ScoreService } from '../services/score.service';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {
  gridOptions: GridOptions;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridColumnApi: any;
  gridApi: any;
  rowData: any;

  constructor(private scoreinput :ScoreService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {context: {componentParent: this}};

    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', minWidth: 50,width:75,suppressSizeToFit: true,lockPosition: true, suppressNavigable: true },
      { headerName: 'Match Date', field: 'matchDate', sortable: true, minWidth: 150,width:150,suppressSizeToFit: true, cellStyle: { 'font-weight': 'bolder' } },
      { headerName: 'Match Name', field: 'matchName', sortable: true, minWidth: 225,width:225,suppressSizeToFit: true, cellStyle: { color: '#0084e7', 'font-weight': 'bolder' } },
      { headerName: 'Score Input', field: 'rate', sortable: true, minWidth: 100,width:100,suppressSizeToFit: true, cellRendererFramework: RatesnavigationComponent },
      { headerName: 'Toss', field: 'updatetoss', minWidth: 150,width:150,suppressSizeToFit: true, cellRendererFramework: CustomcellbuttonsComponent },
      { headerName: 'Toss Result', field: 'tossResult', resizable: true, minWidth: 200},
      { headerName: 'Result', field: 'updateresult', minWidth: 150,width:150,suppressSizeToFit: true, cellRendererFramework: CustomcellbuttonsComponent },
      { headerName: 'Match Result', field: 'matchResult', resizable: true, minWidth: 200 },
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

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.getscoreList();
  }
  getscoreList(){
    this.scoreinput.GetScoreList().subscribe(resp=>{
      // console.log(resp);
      this.rowData=resp.data;
    })
  }

  ngOnInit() {
  }

}
