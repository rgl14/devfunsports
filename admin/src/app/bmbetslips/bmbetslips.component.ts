import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsermanagementService } from '../services/usermanagement.service';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';

@Component({
  selector: 'app-bmbetslips',
  templateUrl: './bmbetslips.component.html',
  styleUrls: ['./bmbetslips.component.css']
})
export class BmbetslipsComponent implements OnInit {
  gridOptions: GridOptions;
  title: string;
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  matchBfId: string;
  sportBfId: string;
  analysisdata: Subscription;
  analysiseventdata: any;
  Event: any;
  userId: any;
  admReport: any;
  bookData: any;
  rowData=[];
  matchId: string;
  MktId: string;
  accountInfo: any;

  constructor(private route:ActivatedRoute,private usermanagement:UsermanagementService,private analysisservice:AnalysisSignalrService,) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Action', field: 'action', sortable: true, width: 75,cellRendererFramework:CustomcellbuttonsComponent,cellStyle: {cursor:'pointer','text-align':'center'}},
      // {headerName: 'ID', field: 'userId', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Runner', field: 'runnerName', sortable: true, width: 200,cellStyle: {color: '#414141','font-weight':'bolder'}},
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
      
       if(rowvalue.marketName=="BOOK MAKING"){
          var pnlodds:number=rowvalue.odds;
          var pnlstake=rowvalue.stake;
          var pnlvalue=pnlodds*pnlstake/100;
          var totalvalue=pnlvalue.toFixed(2);
          return totalvalue.toString();
       }else{
          var pnlodds:number=rowvalue.odds-1;
          var pnlstake=rowvalue.stake;
          var pnlvalue=pnlodds*pnlstake;
          var totalvalue=pnlvalue.toFixed(2);
          return totalvalue.toString();
       }
      // console.log(pnlvalue)
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

  showaction(show) {
    this.gridColumnApi.setColumnVisible("action", show);
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
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
      this.usermanagement.getAccountInfo().subscribe(resp=>{
        // console.log(resp.data);
        this.userId=resp.data.userId;
        this.ConnectAnalysisdata(this.userId);
      })
  }
  ConnectAnalysisdata(userId){
    this.analysisdata=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        this.analysiseventdata=resp;
          this.Event=this.analysiseventdata[this.sportBfId].eventList[this.matchBfId];
          // console.log(this.Event);
          this.admReport=this.Event._admReport[userId];
          if(this.admReport){
            this.bookData=this.admReport.bmBookData;
            if(this.admReport.bmBetdata!=null ){
              this.rowData=this.admReport.bmBetdata;
            }else{
              this.rowData=[];
            }
          }
      }
    })
  }
  ngOnDestroy(){
    if(this.analysisdata!=undefined){
      this.analysisdata.unsubscribe();
    }
  }
}
