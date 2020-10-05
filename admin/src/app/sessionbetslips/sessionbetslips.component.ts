import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import _ from "lodash";

@Component({
  selector: 'app-sessionbetslips',
  templateUrl: './sessionbetslips.component.html',
  styleUrls: ['./sessionbetslips.component.css']
})
export class SessionbetslipsComponent implements OnInit,OnDestroy {
  gridOptions: GridOptions;
  title: string;
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  sportBfId: string;
  matchBfId: string;
  userId: any;
  analysisdata: any;
  analysiseventdata: any;
  Event: any;
  admReport: any;
  rowData=[];
  fancybetArray=[];
  accountInfo: any;

  constructor(
    private route:ActivatedRoute,private usermanagement:UsermanagementService,private analysisservice:AnalysisSignalrService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Action', field: 'action', sortable: true, width: 75,cellRendererFramework:CustomcellbuttonsComponent,cellStyle: {cursor:'pointer','text-align':'center'}},
      // {headerName: 'ID', field: 'userId', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Runner', field: 'runnerName',resizable: true, sortable: true, width: 200,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Bet type', field: 'backLay', sortable: true, width: 150},
      {headerName: 'Client', field: 'clUsername', sortable: true, width: 150,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Odds', field: 'odds', sortable: true, width: 100},
      {headerName: 'Stake', field: 'stake', sortable: true, width: 100,valueFormatter: balanceFormatter},
      {headerName: 'P | L', field: 'MComm', sortable: true, width: 100,valueFormatter: profitlossFormatter,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Time', field: 'date', sortable: true, width: 150,cellStyle: {color: 'red','font-weight':'bolder'}},
      {headerName: 'ID', field: 'id', sortable: true, width: 100},
      {headerName: 'IP', field: 'sourceInfo', sortable: true, width: 125,valueFormatter: IpFormatter},
      {headerName: 'Master', field: 'masterUsername', sortable: true, width: 100},
      {headerName: 'Dealer', field: 'agentUsername', sortable: true, width: 100},
    ]; 

    function profitlossFormatter(params){
      var rowvalue=params.data;
      // console.log(rowvalue)
      var pnlodds=rowvalue.odds/100;
      var pnlstake=rowvalue.stake;
      var pnlvalue=pnlodds*pnlstake;
       var totalvalue=pnlvalue.toFixed(2);
      // console.log(pnlvalue)
      return totalvalue.toString();
    }
    function balanceFormatter(params){
      var twodecimalvalue=parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }
    function IpFormatter(params){
      var ipvalues=params.value.split(",");
      // console.log(ipvalues);
      return ipvalues[5]
    }
    
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';
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

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.showaction(false)
  }

  showaction(show) {
    this.gridColumnApi.setColumnVisible("action", show);
  }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
    this.sportBfId=this.route.snapshot.paramMap.get('sportBfId');
    this.matchBfId=this.route.snapshot.paramMap.get('bfId');
    this.usermanagement.getAccountInfo().subscribe(data=>{
      this.accountInfo=data.data;
      // console.log(this.accountInfo)
      if(this.accountInfo.userType==1){
        this.showaction(true);
      }else{
        this.showaction(false);
      }
    })
    if(this.sportBfId!=null){
      this.usermanagement.getAccountInfo().subscribe(resp=>{
        // console.log(resp.data);
        this.userId=resp.data.userId;
        this.ConnectAnalysisdata(this.userId);
      })
    }
  }
  ConnectAnalysisdata(userId){
    this.analysisdata=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        this.analysiseventdata=resp;
          this.Event=this.analysiseventdata[this.sportBfId].eventList[this.matchBfId];
          console.log(this.Event);
          this.admReport=this.Event._admReport[userId];
          if(this.admReport.fancyBetdata!=null ){
            this.rowData=this.fancybetformat(this.admReport.fancyBetdata);
          }else{
            this.rowData=[];
          }
      }
    })
  }
  fancybetformat(fancybetdata){
    this.fancybetArray=[];
    _.forEach(fancybetdata, (item, index) => {
      _.forEach(item, (item1, index) => {
        this.fancybetArray.push(item1);
      })
    })
    // console.log(this.fancybetArray)
    return this.fancybetArray.reverse();
  }
  ngOnDestroy(){
    this.analysisdata.unsubscribe();
  }

}
