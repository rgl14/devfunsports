import { Component, OnInit, Input } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { MatDialog } from "@angular/material";
import { RejectBetdialog } from "./rejectbet.componet";
import { UsermanagementService } from "src/app/services/usermanagement.service";

@Component({
  selector: "betList",
  templateUrl: "./betlist.component.html",
})
export class betList implements OnInit {
  gridOptions: GridOptions;
  columnDefs: any;
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  usertype: number;
  creatorId: string;
  innerHeight: number;
  selected = [];
  rowSelection;
  defaultColDef;
  @Input() data;
  @Input() rowData;
  @Input() type;
  AccountInfo: any;
  show: boolean;
  searchValue;
  constructor(
    private dialog: MatDialog,
    private usermanagement: UsermanagementService
  ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this,
      },
      getRowClass: (params) => {
        return params.data.backLay.toLowerCase() === "back" ||
          params.data.backLay.toLowerCase() === "yes"
          ? "mark-back"
          : "mark-lay";
      },
    };

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      lockPosition: true,
      cellStyle: { "text-align": "center" },
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

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.rowSelection = "multiple";
    this.UserInfo();
  }

  UserInfo() {
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.AccountInfo = resp.data;
      if (this.AccountInfo) {
        if (this.AccountInfo.userType == 1) {
          this.showraction(true);
        } else {
          this.showraction(false);
        }
      }
    });
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  showraction(show) {
    this.show = show;
    this.gridColumnApi.setColumnVisible("action", show);
  }

  onSelectionChanged(event) {
    this.selected = this.gridApi.getSelectedRows();
    console.log(this.selected);
  }

  filtergroup(e) {
    console.log(e);
    this.gridOptions.api.setQuickFilter(e.target.value);
  }

  onRowSelected(event) {
    this.selected = event.data;
  }

  rejectBets() {}

  openDeleteBetDialog(bet): void {
    console.log(bet);
    const dialogRef = this.dialog.open(RejectBetdialog, {
      width: "250px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
