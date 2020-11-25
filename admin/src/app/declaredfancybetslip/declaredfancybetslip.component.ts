import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportsService } from "../services/reports.service";
import { GridOptions } from "ag-grid-community";

@Component({
  selector: "app-declaredfancybetslip",
  templateUrl: "./declaredfancybetslip.component.html",
  styleUrls: ["./declaredfancybetslip.component.css"],
})
export class DeclaredfancybetslipComponent implements OnInit {
  matchId: any;
  MktId: any;
  title: string;
  gridOptions: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  rowData = [];
  searchValue;
  constructor(private route: ActivatedRoute, private reports: ReportsService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "ID", field: "betId", sortable: true, minWidth: 75 },
      {
        headerName: "Runner",
        field: "runnerName",
        filter: "agTextColumnFilter",
        sortable: true,
        minWidth: 100,
        cellStyle: { color: "#414141", "font-weight": "bolder" },
      },
      {
        headerName: "Bet type",
        field: "betType",
        sortable: true,
        minWidth: 75,
        cellStyle: { color: "#414141", "font-weight": "bolder" },
        cellClass: function (params) {
          return params.value == "yes" || params.value == "Yes"
            ? "Back"
            : "Lay";
        },
      },
      {
        headerName: "Client",
        field: "client",
        sortable: true,
        minWidth: 100,
        cellStyle: { color: "#414141", "font-weight": "bolder" },
      },
      { headerName: "Score", field: "score", sortable: true, minWidth: 75 },
      { headerName: "Odds", field: "odds", sortable: true, minWidth: 75 },
      {
        headerName: "Stake",
        field: "stake",
        sortable: true,
        minWidth: 75,
        valueFormatter: balanceFormatter,
      },
      {
        headerName: "P | L",
        field: "",
        sortable: true,
        minWidth: 100,
        valueFormatter: profitlossFormatter,
        cellStyle: cellstlesetter,
      },
      {
        headerName: "Time",
        field: "betTime",
        sortable: true,
        minWidth: 125,
        cellStyle: { "font-weight": "bolder" },
      },
      { headerName: "IP", field: "ipaddress", sortable: true, minWidth: 100 },
      { headerName: "Master", field: "master", sortable: true, minWidth: 75 },
      { headerName: "Dealer", field: "dealer", sortable: true, minWidth: 75 },
      {
        headerName: "Status",
        field: "action",
        sortable: true,
        minWidth: 75,
        cellStyle: { "font-weight": "bolder" },
        cellClass: function (params) {
          return params.value == "WIN" ? "profit" : "loss";
        },
      },
    ];

    function profitlossFormatter(params) {
      var rowvalue = params.data;
      // console.log(rowvalue)
      var pnlodds = rowvalue.odds / 100;
      var pnlstake = rowvalue.stake;
      if((rowvalue.betType=="No" || rowvalue.betType=="no") && rowvalue.action=="WIN"){
        var pnlvalue = parseFloat(pnlstake);
      }else{
        var pnlvalue = pnlodds * pnlstake;
      }
      // console.log(pnlvalue)
      return pnlvalue.toString();
    }
    function balanceFormatter(params) {
      var twodecimalvalue = parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }
    function cellstlesetter(params) {
      var rowvalue = params.data;
      // console.log(rowvalue)
      var pnlodds = rowvalue.odds / 100;
      var pnlstake = rowvalue.stake;
      if (rowvalue.action=="LOSS") {
        return { color: "#5cb55c", "font-weight": "bolder" };
      } else {
        return { color: "rgb(231, 59, 59)", "font-weight": "bolder" };
      }
    }

    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">NO DATA</span>';
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = "my-green-class";
    this.gridOptions.getRowClass = function (params: any) {
      if (params.node.rowIndex % 2 === 0) {
        return "my-shaded-effect";
      }
    };
  }

  onPageSizeChanged(newPageSize: any) {
    var value = (document.getElementById("page-size") as HTMLInputElement)
      .value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.matchId = this.route.snapshot.paramMap.get("matchId");
    this.MktId = this.route.snapshot.paramMap.get("id");
    this.title = this.route.snapshot.paramMap.get("title");
    this.reports.GetFancyBetSlip(this.matchId).subscribe((resp) => {
      this.rowData = resp.data;
    });
  }
  ngOnInit() {}
}
