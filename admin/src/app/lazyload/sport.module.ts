import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import {
  MatFormFieldModule,
  MatCheckboxModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatInputModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BreadcrumbModule } from "angular-crumbs";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { MatchesComponent } from "../matches/matches.component";
import { InplaylistComponent } from "../inplaylist/inplaylist.component";
import { InplaymatchesComponent } from "../inplaymatches/inplaymatches.component";
import {
  MatchdashboardComponent,
  FancyBookDialog,
} from "../matchdashboard/matchdashboard.component";
import { DeclaredmatchesComponent } from "../declaredmatches/declaredmatches.component";
import { BetslipsComponent } from "../betslips/betslips.component";
import { SessionbetslipsComponent } from "../sessionbetslips/sessionbetslips.component";
import { BmbetslipsComponent } from "../bmbetslips/bmbetslips.component";
import { MarketanalysisComponent } from "../marketanalysis/marketanalysis.component";
import { MarketreportComponent } from "../marketreport/marketreport.component";
import { DeclaredbetslipComponent } from "../declaredbetslip/declaredbetslip.component";
import { DeclaredfancybetslipComponent } from "../declaredfancybetslip/declaredfancybetslip.component";
import { CompanyreportComponent } from "../companyreport/companyreport.component";
import { ClientreportComponent } from "../clientreport/clientreport.component";
import {
  ClientcollectionreportComponent,
  PartialPaymentDialog,
  ConfirmBoxDialog,
} from "../clientcollectionreport/clientcollectionreport.component";
import { SessionearningreportComponent } from "../sessionearningreport/sessionearningreport.component";
import { MaterialModule } from "../material-module";
import { SharedModule } from "../shared/shared.module";
import { ChildrenContainerComponent } from "../shared/components/children-container.component";
import { betList } from "../matchdashboard/betList/betlist.component";
import { child } from "../matchdashboard/betList/child.componet";
import { RejectBetdialog } from "../matchdashboard/betList/rejectbet.componet";

const declaredmatchdashroutes: Routes = [
  {
    path: "declaredbetslips/:matchId/:id/:title",
    component: DeclaredbetslipComponent,
    data: { breadcrumb: "Declared Betslips" },
  },
  {
    path: "declaredsessionbetslips/:matchId/:id/:title",
    component: DeclaredfancybetslipComponent,
    data: { breadcrumb: "Declared Session Betslips" },
  },
  {
    path: "companyreport/:matchId/:id/:title",
    component: CompanyreportComponent,
    data: { breadcrumb: "Company Report" },
  },
  {
    path: "clientreport/:matchId/:id/:title",
    component: ClientreportComponent,
    data: { breadcrumb: "Client Report" },
  },
  {
    path: "clientcollectionreport/:matchId/:title",
    component: ClientcollectionreportComponent,
    data: { breadcrumb: "Client Collection Report" },
  },

  {
    path: "sessionearningrepport/:matchId/:title",
    component: SessionearningreportComponent,
    data: { breadcrumb: "Session Earning Report" },
  },
];

const routes: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Sport",
    },
    children: [
      {
        path: "AllMatch",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "All Match" },
        children: [
          {
            path: "",
            component: InplaymatchesComponent,
          },
          {
            path: "matchdashboard/:sportBfId/:bfId/:matchId/:title",
            component: ChildrenContainerComponent,
            data: { breadcrumb: "Match Dashboard" },
            children: [
              {
                path: "",
                component: MatchdashboardComponent,
              },
            ],
          },
        ],
      },
      {
        path: "inplaylist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "In Play" },
        children: [
          {
            path: "",
            component: InplaylistComponent,
          },
          {
            path: "matchdashboard/:sportBfId/:bfId/:matchId/:title",
            component: ChildrenContainerComponent,
            data: { breadcrumb: "Match Dashboard" },
            children: [
              {
                path: "",
                component: MatchdashboardComponent,
              },
            ],
          },
          {
            path: "matchdashboard/:sportBfId/:bfId/:matchId/:title/:flag",
            component: ChildrenContainerComponent,
            data: { breadcrumb: "Match Dashboard" },
            children: [
              {
                path: "",
                component: MatchdashboardComponent,
              },
            ],
          },
        ],
      },
      {
        path: "matches",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Declared Matches" },
        children: [
          {
            path: "",
            component: MatchesComponent,
          },
          {
            path: "declaredmatches/:matchId/:id/:title/:sprtID",
            component: DeclaredmatchesComponent,
            data: { breadcrumb: "Declared Match Dashboard" },
          },

          {
            path: "declaredbetslips/:matchId/:id/:title",
            component: DeclaredbetslipComponent,
            data: { breadcrumb: "Declared Betslips" },
          },
          {
            path: "declaredsessionbetslips/:matchId/:id/:title",
            component: DeclaredfancybetslipComponent,
            data: { breadcrumb: "Declared Session Betslips" },
          },
          {
            path: "companyreport/:matchId/:id/:title",
            component: CompanyreportComponent,
            data: { breadcrumb: "Company Report" },
          },
          {
            path: "clientreport/:matchId/:id/:title",
            component: ClientreportComponent,
            data: { breadcrumb: "Client Report" },
          },
          {
            path: "clientcollectionreport/:matchId/:title",
            component: ClientcollectionreportComponent,
            data: { breadcrumb: "Client Collection Report" },
          },

          {
            path: "sessionearningrepport/:matchId/:title",
            component: SessionearningreportComponent,
            data: { breadcrumb: "Session Earning Report" },
          },
          {
            path: "bmbetslips/:sportBfId/:bfId/:title",
            component: BmbetslipsComponent,
            data: { breadcrumb: "Bookmaker Bet Slips" },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    InplaymatchesComponent,
    InplaylistComponent,
    MatchesComponent,
    MatchdashboardComponent,
    DeclaredmatchesComponent,
    SessionearningreportComponent,
    ClientcollectionreportComponent,
    ClientreportComponent,
    CompanyreportComponent,
    DeclaredfancybetslipComponent,
    DeclaredbetslipComponent,
    MarketreportComponent,
    MarketanalysisComponent,
    BmbetslipsComponent,
    SessionbetslipsComponent,
    BetslipsComponent,
    RejectBetdialog,
    FancyBookDialog,
    betList,
    child,
    PartialPaymentDialog,
    ConfirmBoxDialog,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgGridModule,
    MatFormFieldModule,
    FormsModule,
    MaterialModule,
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
  ],
  exports: [RouterModule],
  entryComponents: [
    RejectBetdialog,
    FancyBookDialog,
    child,
    PartialPaymentDialog,
    ConfirmBoxDialog,
  ],
})
export class SportModule {}
