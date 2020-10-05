import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-package-settings',
  templateUrl: './package-settings.component.html',
  styleUrls: ['./package-settings.component.css']
})
export class PackageSettingsComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs: any
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;

  constructor(private sportService: SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', minWidth: 50, sortable: true, lockPosition: true, suppressNavigable: true },
      { headerName: 'Package Name', field: 'label', sortable: true, minWidth: 100 },
      { headerName: 'Edit', field: '', sortable: true, minWidth: 100, cellRendererFramework: CustomcellbuttonsComponent, cellStyle: { color: '#0084e7', 'font-weight': 'bolder' } },
    ];

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function (params: any) {
      return 45;
    }
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = 'my-green-class';
    this.gridOptions.getRowClass = function (params: any) {
      if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
      }
    }
  }

  onPageSizeChanged(newPageSize: any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetMktSettingsPckgList();
  }

  GetMktSettingsPckgList() {
    this.sportService.GetMktSettingsPckgList().subscribe(data => {
      this.rowData = data.data;
    }, err => {
      console.log(err);
    })
  }

}
