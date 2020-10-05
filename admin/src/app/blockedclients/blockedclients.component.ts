import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blockedclients',
  templateUrl: './blockedclients.component.html',
  styleUrls: ['./blockedclients.component.css']
})
export class BlockedclientsComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  innerHeight: number;
  constructor(private usermanagement:UsermanagementService,private route:ActivatedRoute) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'userId',sort: "desc",width:75,suppressSizeToFit: true, minWidth: 50,lockPosition:true,suppressNavigable:true},
      {headerName: 'Username', field: 'userName', sortable: true,width:100,suppressSizeToFit: true, minWidth: 100,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Name', field: 'name', sortable: true,width:100,suppressSizeToFit: true, minWidth: 100},
      {headerName: 'Match Commission  (%)', field: 'matchComm',width:150,suppressSizeToFit: true, sortable: true, minWidth: 75},
      {headerName: 'Session Commission  (%)', field: 'sessionComm',width:160,suppressSizeToFit: true, sortable: true, minWidth: 75},
      {headerName: 'Status', field: 'accStatus', minWidth: 100,cellRendererFramework:ButtontogglecellComponent},
    ]; 
    
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize=50;
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

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.innerHeight=window.innerHeight;
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetuserList();
  }

  GetuserList(){
    this.usermanagement.getBlockedClient().subscribe(resp=>{
      this.rowData=resp.data;
      // console.log(resp.data)
    })
  }

}
