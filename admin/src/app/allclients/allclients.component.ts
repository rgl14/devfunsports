import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { NavigationcellComponent } from "../navigationcell/navigationcell.component";
import { CustomcellbuttonsComponent } from "../customcellbuttons/customcellbuttons.component";
import { ButtontogglecellComponent } from "../buttontogglecell/buttontogglecell.component";
import { UsermanagementService } from "../services/usermanagement.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./allclients.component.html",
})
export class allClientsComponent implements OnInit {
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
        headerName: "Userid",
        field: "userId",
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
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Firstname",
        field: "name",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Fixlimit",
        field: "fixLimit",
        sortable: true,
        minWidth: 125,
        width: 100,
        suppressSizeToFit: true,
        valueFormatter: numberWithCommas,
        cellStyle: { "font-weight": "bolder", "font-style": "sans-serif" },
      },
      {
        headerName: "currentlimit",
        field: "curLimit",
        sortable: true,
        minWidth: 125,
        width: 100,
        suppressSizeToFit: true,
        valueFormatter: numberWithCommas,
      },
      {
        headerName: "RegistrationDate",
        field: "creationDate",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
      },
      {
        headerName: "Agentid",
        field: "agentId",
        sortable: true,
        minWidth: 125,
        width: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "AgentName",
        field: "agentName",
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Masterid",
        field: "masterId",
        minWidth: 75,
        width: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "MasterName",
        field: "masterName",
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "Supermasterid",
        field: "superMasterId",
        minWidth: 75,
        width: 100,
        suppressSizeToFit: true,
      },
      {
        headerName: "SupermasterName",
        field: "superMasterName",
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        filter: "agTextColumnFilter",
      },
      {
        headerName: "DoubleSuperid",
        field: "adminId",
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
      },
      {
        headerName: "DoubleSuperName",
        field: "adminName",
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        filter: "agTextColumnFilter",
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
    this.usertype = 6;
    if (this.creatorId == undefined || this.creatorId == "0") {
      this.creatorId = "0";
      this.showraction(true);
    } else {
      this.showraction(false);
    }
    this.usermanagement.getallUserlist().subscribe((resp) => {
      this.rowData = resp._data;
    });
  }
}
