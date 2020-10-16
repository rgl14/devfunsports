import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { ReportsService } from '../services/reports.service';

@Component({
  templateUrl: './transaction.component.html',
})
export class transactionComponent implements OnInit {

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

  constructor(private report:ReportsService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time',lockPosition:true,suppressSizeToFit: true, field: 'timestamp', sortable: true, width: 350,  minWidth: 100},
      {headerName: 'Ip Address', field: 'ipaddress',suppressSizeToFit: true, width: 300,  minWidth: 100},
      {headerName: 'Amount', field: 'amount', sortable: true, width: 250,suppressSizeToFit: true,suppressNavigable:true,  minWidth: 100,valueFormatter: numberWithCommas,cellStyle:  function(params) {
        if (parseInt(params.data.amount) >= 0) {
          return { color: "#5cb55c", "font-weight": "bolder" };
        } else {
          return { color: "rgb(231, 59, 59)", "font-weight": "bolder" };
        }
      }},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 600,suppressSizeToFit: true,  minWidth: 100,cellStyle: {'font-weight':'bolder'},valueFormatter: numberWithCommas,},
     
    ]; 

    function numberWithCommas(params) {
        var twodecimalvalue = parseFloat(params.value);
        // var parts = twodecimalvalue.toString().split(".");
        // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return parts.join(".");
        var ans = twodecimalvalue.toLocaleString("en-IN", {
          currency: "INR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return ans;
      }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize=10;
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

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
      this.transactions()
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }

  transactions(){
      this.report.getTransactions().subscribe(resp=>{
        this.rowData = resp.data;
        this.rowData.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
          });
      })
  }

}
