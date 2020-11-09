import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {GridOptions} from "ag-grid-community";
import { ReportsService } from '../services/reports.service';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import {redirectComponent} from './entry-component/redirect.component'
export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    hourStep: 1,
    minuteStep: 1,
    secondsStep:1,
    showMeridian: false,
    readonlyInput: false,
    mousewheel: true,
    showMinutes: true,
    showSeconds: false,
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds'
  });
}
@Component({
  selector: 'app-accout-statement',
  templateUrl: './accout-statement.component.html',
  styleUrls: ['./accout-statement.component.css'],
  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]
})
export class AccoutStatementComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  rowD=[];
  gridApi: any;
  gridColumnApi: any;
  date: Date;
  fromdate: string;
  todate: string;
  selectfromdate: any;
  selecttodate: any;
  selectfromtime: any;
  selecttotime: any;
  dropdownList=[];
  dropdownSettings: { };
  bsRangeValue: Date[];
  bsValue = new Date();
  maxDate = new Date();

  myDateValue:Date;
  datepicker: Date;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  defaultColDef: { sortable: boolean; };
  Selectoption;
  userId: any;
  Uname: any;

  constructor(private getreports:ReportsService,private route:ActivatedRoute) {
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    };
    this.gridOptions.columnDefs = [
      {headerName: 'Date', field: 'date',sort: "desc",resizable: true, sortable: true, minWidth: 100,width:150,suppressSizeToFit: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Type', field: 'type', sortable: true,resizable: true, minWidth: 100,width:150,suppressSizeToFit: true,},
      {headerName: 'Description', field: 'description', sortable: true,resizable: true, minWidth: 250,width:600,suppressSizeToFit: true,cellRendererFramework: redirectComponent,},
      {headerName: 'Dr', field: 'debit',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: debitFormatter,cellClass: function(params) { return (params.data.dr >= 0 ? 'profit':'loss')}},
      {headerName: 'Cr', field: 'credit',resizable: true, sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,valueFormatter: creditFormatter,cellClass: function(params) { return (params.data.cr >= 0 ? 'profit':'loss')}},
      {headerName: 'Balance', field: 'balance',resizable: true, sortable: true, minWidth: 100,valueFormatter: numberWithCommas,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ];

    function numberWithCommas(params) {

        var twodecimalvalue=parseFloat(params.value);
        var ans= twodecimalvalue.toLocaleString('en-IN',{ currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
        return ans;
    }

    function debitFormatter(params){
      // console.log(params)
      if(params.data.dr==null || params.data.dr=="-"){
        return "--"
      }else{
        var twodecimalvalue=parseFloat(params.data.dr);
        var ans= twodecimalvalue.toLocaleString('en-IN',{ currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
        return ans;
      }
    }

    function creditFormatter(params){
      // console.log(params)
      if(params.data.cr==null || params.data.cr=="-"){
        return "--"
      }else{
        var twodecimalvalue=parseFloat(params.data.cr);
        var ans= twodecimalvalue.toLocaleString('en-IN',{ currency: "INR",minimumFractionDigits:2,maximumFractionDigits:2 });
        return ans;
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


    this.selectfromdate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.selecttodate = new Date();
    this.selectfromtime = new Date(new Date().setHours(0, 0, 0, 0));
    this.selecttotime = new Date(new Date());
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
    this.route.params.subscribe(param => {
      console.log(param)
      if(param.userId!=undefined){
        this.userId=param.userId;
        this.Uname=param.Uname;
        this.Selectoption=param.type;
      }else{
        this.userId=0;
        this.Selectoption="0";
      }
    })
this.dropdownSettings = {
          singleSelection: false,
          text:"Select",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
        var days = 1;
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        this.date = last
        this.fromdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00";
        this.todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() +":"+date.getMinutes()+":"+date.getSeconds();
        let accdates={
          "fromdate":this.fromdate,
          "todate":this.todate
        }
      this.getreports.AccountStatement(accdates,this.Selectoption,this.userId).subscribe(resp=>{
        this.rowData=resp.data;
      })
  }

  accountstatement(){

    console.log(this.selectfromdate,this.selecttodate);
     let accdates={
       "fromdate":this.getFromDateAndTime(),
       "todate":this.getToDateAndTime()
     }
     this.getreports.AccountStatement(accdates,this.Selectoption,this.userId).subscribe(resp=>{
      this.rowData=resp.data;
    })
  }

  fromDateChange(date) {
    console.log(date);
  }
  toDateChange(date) {
    console.log(date);
  }

  fromTimeChange(time) {
    console.log(time);
  }

  toTimeChange(time) {
    console.log(time);
  }

  getFromDateAndTime() {
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromtime.getHours()}:${this.selectfromtime.getMinutes()}:${this.selectfromtime.getSeconds()}`;
  }
  getToDateAndTime() {
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttotime.getHours()}:${this.selecttotime.getMinutes()}:${this.selecttotime.getSeconds()}`;
  }

  convertfrom(str) {
    var date = new Date(str);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  convertto(str) {
    var date = new Date(str);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }



    onItemSelect(item:any){
        this.selectfromdate=this.convertfrom(this.bsRangeValue[0]);
        this.selecttodate=this.convertto(this.bsRangeValue[1]);
        console.log(this.selectfromdate,this.selecttodate);
        let accdates={
          "fromdate":this.selectfromdate,
          "todate":this.selecttodate
        }
        this.getreports.AccountStatement(accdates,this.Selectoption,this.userId).subscribe(resp=>{
          this.rowData=resp.data;
        })
    }
    OnItemDeSelect(item:any){
        this.selectfromdate=this.convertfrom(this.bsRangeValue[0]);
        this.selecttodate=this.convertto(this.bsRangeValue[1]);
        console.log(this.selectfromdate,this.selecttodate);
        let accdates={
          "fromdate":this.selectfromdate,
          "todate":this.selecttodate
        }
        this.getreports.AccountStatement(accdates,this.Selectoption,this.userId).subscribe(resp=>{
          this.rowData=resp.data;
        })
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

}

