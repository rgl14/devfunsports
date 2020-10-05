import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { GridOptions } from "ag-grid-community";

@Component({
  selector: "Tablelist",
  templateUrl: "./table.component.html",
})
export class TableList implements OnInit {
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
  @Output() valueChange = new EventEmitter();
  counter = 0;
  searchValue;
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this,
      },
    };

    this.defaultColDef = {
      sortable: true,
      resizable: true,
      lockPosition: true,
      filter: true,
      cellStyle: { "text-align": "center" },
    };

    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">NO DATA</span>';

    // this.gridOptions.paginationPageSize=10;
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
    // this.gridOptions.api.setQuickFilter(
    //   (document.getElementById("filter-text-box") as HTMLInputElement).value
    // );
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(event) {
    this.selected = this.gridApi.getSelectedRows();
    console.log(this.selected);
  }

  filtergroup(e) {
    console.log(e);
    this.gridOptions.api.setQuickFilter(e.target.value);
  }

  valueChanged() {
    this.counter = this.counter + 1;
    this.valueChange.emit(this.counter);
  }
}
