import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { NavigationcellComponent } from "../navigationcell/navigationcell.component";
import { CustomcellbuttonsComponent } from "../customcellbuttons/customcellbuttons.component";
import { ButtontogglecellComponent } from "../buttontogglecell/buttontogglecell.component";
import { UsermanagementService } from "../services/usermanagement.service";
import { ActivatedRoute } from "@angular/router";
import { dWcomponent } from "../customcellbuttons/DWChild/dwchild.component";

@Component({
  selector: "app-master",
  templateUrl: "./master.component.html",
  styleUrls: ["./master.component.css"],
})
export class MasterComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs: any;
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  usertype: number;
  creatorId: string;
  innerHeight: number;

  constructor(
    private usermanagement: UsermanagementService,
    private route: ActivatedRoute
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    };
    this.gridOptions.columnDefs = [
      {
        headerName: "ID",
        field: "userId",
        sort: "desc",
        minWidth: 50,
        lockPosition: true,
        suppressNavigable: true,
        width: 75,
        suppressSizeToFit: true,
      },
      {
        headerName: "Username",
        field: "userName",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        cellRendererFramework: NavigationcellComponent,
        cellStyle: { color: "#0084e7", "font-weight": "bolder" },
      },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "Balance",
        field: "chips",
        sortable: true,
        minWidth: 150,
        width: 135,
        suppressSizeToFit: true,
        valueFormatter: numberWithCommas,
        cellStyle:  function(params) {
          if (params.data.chips >= 0) {
            return { color: "#5cb55c", "font-weight": "bolder" };
          } else {
            return { color: "rgb(231, 59, 59)", "font-weight": "bolder" };
          }
      }
      },
      {
        headerName: "Current P | L",
        field: "pNl",
        sortable: true,
        minWidth: 125,
        width: 100,
        suppressSizeToFit: true,
        valueFormatter: numberWithCommas,
        cellStyle:  function(params) {
          if (params.data.pNl >= 0) {
            return { color: "#5cb55c", "font-weight": "bolder" };
          } else {
            return { color: "rgb(231, 59, 59)", "font-weight": "bolder" };
          }
        }
      },
      {
        headerName: "Exposure",
        field: "expoLimit",
        sortable: true,
        minWidth: 125,
        width: 100,
        suppressSizeToFit: true,
        valueFormatter: numberWithCommas,
      },
      // {
      //   headerName: "Avail. Credit",
      //   field: "balance",
      //   sortable: true,
      //   minWidth: 125,
      //   width: 100,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: "My share (%)",
      //   field: "myShare",
      //   sortable: true,
      //   minWidth: 75,
      //   width: 100,
      //   suppressSizeToFit: true,
      // },
      {
        headerName: "Max Share (%)",
        field: "maxShare",
        sortable: true,
        minWidth: 75,
        width: 125,
        suppressSizeToFit: true,
      },
      {headerName: 'M-Comm  (%)', field: 'MComm', sortable: true,width:75,suppressSizeToFit: true, minWidth: 75},
      // {headerName: 'M-Loss  (%)', field: 'mLossingComm', sortable: true,width:100,suppressSizeToFit: true, minWidth: 75},
      // {headerName: 'S-Comm  (%)', field: 'SComm', sortable: true,width:100,suppressSizeToFit: true, minWidth: 75},
      // {headerName: 'S-Loss  (%)', field: 'sLossingComm', sortable: true,width:100,suppressSizeToFit: true, minWidth: 75},
      {
        headerName: "Status",
        field: "accStatus",
        minWidth: 75,
        width: 100,
        suppressSizeToFit: true,
        cellRendererFramework: ButtontogglecellComponent,
      },
      {
        headerName: "Bet Allow",
        field: "betStatus",
        minWidth: 75,
        width: 100,
        suppressSizeToFit: true,
        cellRendererFramework: ButtontogglecellComponent,
      },
      {
        headerName: "Chips",
        field: "cp",
        minWidth: 180,
        width: 180,
        suppressSizeToFit: false,
        cellRendererFramework: dWcomponent,
      },
      {
        headerName: "Actions",
        field: "action",
        minWidth: 240,
        width: 240,
        suppressSizeToFit: false,
        cellRendererFramework: CustomcellbuttonsComponent,
      },
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

    this.gridOptions.paginationPageSize = 50;
    this.gridOptions.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function (params: any) {
      return 45;
    };
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

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter(
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }

  showraction(show) {
    this.gridColumnApi.setColumnVisible("action", show);
    this.gridColumnApi.setColumnVisible("cp", show);
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    this.creatorId = this.route.snapshot.paramMap.get("userId");
    this.innerHeight = window.innerHeight;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetuserList();
  }

  GetuserList() {
    this.usertype = 4;
    if (this.creatorId == undefined || this.creatorId == "0") {
      this.creatorId = "0";
      this.showraction(true);
    } else {
      this.showraction(false);
    }
    this.usermanagement
      .getUserlist(this.usertype, this.creatorId)
      .subscribe((resp) => {
        this.rowData = resp._data;
      });
  }
}
