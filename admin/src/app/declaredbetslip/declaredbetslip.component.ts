import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GridOptions } from "ag-grid-community";
import { CustomcellbuttonsComponent } from "../customcellbuttons/customcellbuttons.component";
import { ReportsService } from "../services/reports.service";

@Component({
  selector: "app-declaredbetslip",
  templateUrl: "./declaredbetslip.component.html",
  styleUrls: ["./declaredbetslip.component.css"],
})
export class DeclaredbetslipComponent implements OnInit {
  matchId: any;
  MktId: any;
  title: string;
  gridOptions: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  rowData = [];

  constructor(private route: ActivatedRoute, private reports: ReportsService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: "ID", field: "betId", sortable: true, minWidth: 75 },
      {
        headerName: "Runner",
        field: "runnerName",
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
          return params.value == "Back" || params.value == "back"
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
        sortable: true,
        minWidth: 100,
        field: "pnl",
        cellStyle: cellstlesetter,
      },
      {
        headerName: "Time",
        field: "betTime",
        sortable: true,
        minWidth: 125,
        cellStyle: { color: "red", "font-weight": "bolder" },
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
      var pnlodds = rowvalue.odds - 1;
      var pnlstake = rowvalue.stake;
      var pnlvalue = pnlodds * pnlstake;
      var totalvalue = pnlvalue.toFixed(2);
      // console.log(pnlvalue)
      return totalvalue.toString();
    }
    function balanceFormatter(params) {
      var twodecimalvalue = parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }
    function cellstlesetter(params) {
      var rowvalue = params.data;
      var pnlodds = rowvalue.odds - 1;
      var pnlstake = rowvalue.stake;
      var pnlvalue = pnlodds * pnlstake;
      if (params.data.pnl >= 0) {
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
    this.reports.GetOddsBetSlip(this.matchId).subscribe((resp) => {
      this.rowData = resp.data;
    });
  }

  ngOnInit() {}
}
