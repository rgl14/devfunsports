import { Component, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { CustomcellbuttonsComponent } from "../customcellbuttons/customcellbuttons.component";
import { CelltextfieldComponent } from "../celltextfield/celltextfield.component";
import { CelldisabledtextfieldComponent } from "../celldisabledtextfield/celldisabledtextfield.component";
import { CelldisabledusedlimitComponent } from "../celldisabledusedlimit/celldisabledusedlimit.component";
import { UsermanagementService } from "../services/usermanagement.service";
import { CellcurrentlimittextfeildComponent } from "../cellcurrentlimittextfeild/cellcurrentlimittextfeild.component";

@Component({
  selector: "app-updatelimit",
  templateUrl: "./updatelimit.component.html",
  styleUrls: ["./updatelimit.component.css"],
})
export class UpdatelimitComponent implements OnInit {
  columnDefs: any;
  ClientcolumnDefs: any;
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  adminList: any;
  superMasterList: any;
  masterList: any;
  agentList: any;
  summaryData: any;
  userList: any;
  userType: string;
  updatelimitresp: any;
  agentDefs;
  masDefs;
  compDefs;
  constructor(private usermanagement: UsermanagementService) {
    this.agentDefs = [
      {
        headerName: "ID",
        field: "id",
        minWidth: 50,
        sort: "desc",
        lockPosition: true,
        suppressNavigable: true,
        width: 75,
        suppressSizeToFit: true,
      },
      {
        headerName: "Agent Name",
        field: "clientName",
        sortable: true,
        minWidth: 150,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder", "text-align": "center" },
      },
      {
        headerName: "M-Comm (%)",
        field: "matchComm",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledtextfieldComponent,
      },
      {
        headerName: "S-Comm (%)",
        field: "sessionComm",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledtextfieldComponent,
      },
      {
        headerName: "Fix Limit",
        field: "fixLimit",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelltextfieldComponent,
      },
      {
        headerName: "Used Limit",
        field: "usedLimit",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledusedlimitComponent,
      },
      {
        headerName: "Actions",
        field: "",
        sortable: true,
        minWidth: 100,
        cellRendererFramework: CustomcellbuttonsComponent,
      },
    ];
    this.compDefs = this.agentDefs;
    this.columnDefs = this.agentDefs;
    this.masDefs = this.agentDefs;
    this.ClientcolumnDefs = [
      {
        headerName: "ID",
        field: "id",
        minWidth: 50,
        sort: "desc",
        lockPosition: true,
        suppressNavigable: true,
        width: 75,
        suppressSizeToFit: true,
      },
      {
        headerName: "Client Name",
        field: "clientName",
        sortable: true,
        minWidth: 150,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder", "text-align": "center" },
      },
      {
        headerName: "M-Comm (%)",
        field: "matchComm",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledtextfieldComponent,
      },
      {
        headerName: "S-Comm (%)",
        field: "sessionComm",
        sortable: true,
        minWidth: 100,
        width: 100,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledtextfieldComponent,
      },
      {
        headerName: "Fix Limit",
        field: "fixLimit",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelltextfieldComponent,
      },
      {
        headerName: "Current Limit",
        field: "currentLimit",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CellcurrentlimittextfeildComponent,
      },
      {
        headerName: "Used Limit",
        field: "usedLimit",
        sortable: true,
        minWidth: 125,
        width: 125,
        suppressSizeToFit: true,
        cellStyle: { "font-weight": "bolder" },
        cellRendererFramework: CelldisabledusedlimitComponent,
      },
      {
        headerName: "Actions",
        field: "",
        sortable: true,
        minWidth: 100,
        cellRendererFramework: CustomcellbuttonsComponent,
      },
    ];
  }

  ngOnInit() {
    this.userType = this.usermanagement.getUserType();
    this.getupdatelimitlist();
  }

  displayCounter(count) {
    console.log(count);
    if (count > 0) {
      this.getupdatelimitlist();
    }
  }

  getupdatelimitlist() {
    this.usermanagement.GetCommNLimits().subscribe((resp) => {
      // console.log(resp)
      this.updatelimitresp = resp;
      this.adminList = resp.adminList;
      this.adminList.forEach((item, index) => {
        item["level"] = 2;
      });
      this.superMasterList = resp.superMasterList;
      this.superMasterList.forEach((item, index) => {
        item["level"] = 3;
      });
      this.masterList = resp.masterList;
      this.masterList.forEach((item, index) => {
        item["level"] = 4;
      });
      this.agentList = resp.agentList;
      this.agentList.forEach((item, index) => {
        item["level"] = 5;
      });
      this.summaryData = resp.summaryData;
      this.userList = resp.userList;
      this.userList.forEach((item, index) => {
        item["level"] = 6;
      });
    });
  }
}
