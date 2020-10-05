import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { BreadcrumbModule } from "angular-crumbs";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import {
  CollectionreportComponent,
  ConfirmBoxDialog,
  PartialPaymentDialog,
} from "../collectionreport/collectionreport.component";
import { MyledgersComponent } from "../myledgers/myledgers.component";
import { AccoutStatementComponent } from "../accout-statement/accout-statement.component";
import { ProfitnlossComponent } from "../profitnloss/profitnloss.component";
import { ChildrenContainerComponent } from "../shared/components/children-container.component";
import { SportpnlComponent } from "../sportpnl/sportpnl.component";
import { TournamentpnlComponent } from "../tournamentpnl/tournamentpnl.component";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../material-module";

const routes: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Report",
    },
    children: [
      {
        path: "collectionreport",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Collection Report" },
        children: [
          {
            path: "",
            component: CollectionreportComponent,
          },
        ],
      },
      {
        path: "accountstatement",
        component: AccoutStatementComponent,
        data: { breadcrumb: "Account Statement" },
        children: [
          {
            path: "",
            component: AccoutStatementComponent,
          },
        ],
      },
      {
        path: "myledger",
        component: MyledgersComponent,
        data: { breadcrumb: "My Ledger" },
        children: [
          {
            path: "",
            component: MyledgersComponent,
          },
        ],
      },
      {
        path: "profitnloss",
        component: ProfitnlossComponent,
        data: { breadcrumb: "Profit & Loss" },
        children: [
          {
            path: "",
            component: ProfitnlossComponent,
          },
        ],
      },
      {
        path: "sportpnl",
        component: SportpnlComponent,
        data: { breadcrumb: "Sports P/L" },
        children: [
          {
            path: "",
            component: SportpnlComponent,
          },
        ],
      },
      {
        path: "tournamentpnl",
        component: TournamentpnlComponent,
        data: { breadcrumb: "Tournament P/L" },
        children: [
          {
            path: "",
            component: TournamentpnlComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    CollectionreportComponent,
    AccoutStatementComponent,
    MyledgersComponent,
    ProfitnlossComponent,
    SportpnlComponent,
    TournamentpnlComponent,
    ConfirmBoxDialog,
    PartialPaymentDialog
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    BreadcrumbModule,
    AngularMultiSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SharedModule,
    MaterialModule,
  ],
  exports: [RouterModule],
  entryComponents: [ConfirmBoxDialog, PartialPaymentDialog],
})
export class ReportsModule {}
