import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { LimitsService } from '../services/limits.service';
// import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-coinhistory',
  templateUrl: './coinhistory.component.html',
  styleUrls: ['./coinhistory.component.css']
})
export class CoinhistoryComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  gridApi:any;
  gridColumnApi:any;
  paginationSetPageSize:number;
  paginationNumberFormatter:any;
  rowData=[];
  userId: string;
  userName: string;
  name: string;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  constructor(private route:ActivatedRoute,private limitreport:LimitsService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ChanelogID', field: 'logId', sortable: true, width: 75,lockPosition:true,suppressNavigable:true},
      {headerName: 'Discription',resizable: true, field: 'description', sortable: true, width: 300,cellStyle: {color: '#0084e7'}},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, width: 200,cellStyle: {color: 'green'},valueFormatter: balanceFormatter},
      {headerName: 'Coins', field: 'coins', sortable: true, width: 150,cellStyle: {color: 'green'},valueFormatter: balanceFormatter},
      {headerName: 'Match Commission', field: 'matchComm', sortable: true, width: 150},
      {headerName: 'Session Commission', field: 'sessionComm', sortable: true, width: 180},
      {headerName: 'Created At', field: 'createdAt', sortable: true, width: 270},
    ];

    function balanceFormatter(params){
      if(params.value!='--'){
        var twodecimalvalue=parseInt(params.value).toFixed(2);
        return twodecimalvalue;
      }else{
        return params.value;
      }
    }

    function valuecssclass(params){
      console.log(params.value)
      let cellvaue=parseInt(params.value);
        if(cellvaue>=0){
          return {color: 'green',fontWeight:'bolder'}
        }else{
          return {color: 'red',fontWeight:'bolder'}
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
  
  //   listData: MatTableDataSource<any>;
  //   displayedColumns: string[] = ['chanelogID', 'discription', 'coins', 'matchcommission', 'sessioncommission','createdAt'];
  //   @ViewChild(MatSort,{static: true}) sort: MatSort;
  //   @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  //   searchKey: string;

  //  list=[
  //    {chanelogID : '8303813',discription : 'Coins after match declaration :',coins : '20000.0',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303814',discription : 'Coins after match declaration :',coins : '90000.0',matchcommission : '1.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303815',discription : 'Coins after match declaration :',coins : '4000.0',matchcommission : '0.0',sessioncommission : '2.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303816',discription : 'Coins after match declaration :',coins : '2000.0',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //   ]

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.userName=this.route.snapshot.paramMap.get('userName');
    this.name=this.route.snapshot.paramMap.get('name');
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.limitreport.GetCoinHistory(this.userId).subscribe(resp=>{
      this.rowData=resp.data;
    })
  }

}
