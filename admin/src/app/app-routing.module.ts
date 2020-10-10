import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddadminFundsComponent } from './addadmin-funds/addadmin-funds.component';
import { AddscoreComponent } from "./addscore/addscore.component";
import { AgentlistComponent } from "./agentlist/agentlist.component";
import { BalanceComponent } from "./balance/balance.component";
import { BmrateComponent } from "./bmrate/bmrate.component";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EvenoddComponent } from "./evenodd/evenodd.component";
import { FancyrateComponent } from "./fancyrate/fancyrate.component";
import { HomeComponent } from "./home/home.component";
import { LivereportComponent } from "./livereport/livereport.component";
import { AuthGuard } from "./login/auth.gaurd";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { MarketinfoComponent } from "./marketinfo/marketinfo.component";
import { MarketsComponent } from "./markets/markets.component";
import { MatchsettingComponent } from "./matchsetting/matchsetting.component";
import { MatchsettlementComponent } from "./matchsettlement/matchsettlement.component";
import { NewstickerComponent } from "./newsticker/newsticker.component";
import { ReportslistComponent } from "./reportslist/reportslist.component";
import { RulesComponent } from "./rules/rules.component";
import { ScoreInputComponent } from "./score-input/score-input.component";
import { ScoreListComponent } from "./score-list/score-list.component";
import { SessioninfoComponent } from "./sessioninfo/sessioninfo.component";
import { ChildrenContainerComponent } from "./shared/components/children-container.component";
import { SportslistComponent } from "./sportslist/sportslist.component";
import { TournamentComponent } from "./tournament/tournament.component";
import { UseranalysisComponent } from "./useranalysis/useranalysis.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Home" },
        children: [
          {
            path: "",
            redirectTo: "/home",
            pathMatch: "full",
            data: { breadcrumb: "Home" },
          },
          { path: "home", component: HomeComponent },
          {
            path: "manage-clients",
            loadChildren: () =>
              import("./lazyload/manage-clients.module").then(
                (m) => m.ManageClientsModule
              ),
          },
          {
            path: "report",
            loadChildren: () =>
              import("./lazyload/report.module").then((m) => m.ReportsModule),
          },
          {
            path: "sport",
            loadChildren: () =>
              import("./lazyload/sport.module").then((m) => m.SportModule),
          },
          {
            path: "matchsetting",
            component: MatchsettingComponent,
            data: { breadcrumb: "Match Settings" },
          },
          {
            path: "administration",
            loadChildren: () =>
              import("./lazyload/administration.module").then(
                (m) => m.AdministrationModule
              ),
          },
          {
            path: "newsticker",
            loadChildren: () =>
              import("./lazyload/news-ticker.module").then(
                (m) => m.NewsTickerModule
              ),
          },
          {
            path: "importrate",
            data: { breadcrumb: "Import Rate" },
            loadChildren: () =>
              import("./lazyload/import-rate.module").then(
                (m) => m.ImportRateModule
              ),
          },
          {
            path: "fancy",
            loadChildren: () =>
              import("./lazyload/fancy.module").then((m) => m.FancyModule),
          },
          {
            path: "bookmaker",
            loadChildren: () =>
              import("./lazyload/bookmaker.module").then(
                (m) => m.BookmakerModule
              ),
          },
          {
            path: "evenodd",
            component: EvenoddComponent,
            data: { breadcrumb: "Even Odd" },
          },
          {
            path: "balance",
            component: BalanceComponent,
            data: { breadcrumb: "Balance" },
          },
          // {
          //   path: "fancy",
          //   component: FancyComponent,
          //   data: { breadcrumb: "Fancy" },
          // },
          {
            path: "tournament",
            component: TournamentComponent,
            data: { breadcrumb: "Tournaments" },
          },
          {
            path: "dashboard",
            component: HomeComponent,
            data: { breadcrumb: "Dashboard" },
          },
          {
            path: "adminfunds",
            component: AddadminFundsComponent,
            data: { breadcrumb: "Admin Funds" },
          },
          // {
          //   path: "managepassword",
          //   component: ManagepasswordComponent,
          //   data: { breadcrumb: "Manage Password" },
          // },
          // {
          //   path: "collectionreport",
          //   component: CollectionreportComponent,
          //   data: { breadcrumb: "Collection Report" },
          // },
          // {
          //   path: "myledger",
          //   component: MyledgersComponent,
          //   data: { breadcrumb: "My ledger" },
          // },
          // {
          //   path: "profitnloss",
          //   component: ProfitnlossComponent,
          //   data: { breadcrumb: "Profit Loss" },
          // },
          {
            path: "livereport/:sportBfId/:bfId/:id",
            component: LivereportComponent,
            data: { breadcrumb: "Live Report" },
          },
          {
            path: "match_settlement",
            component: MatchsettlementComponent,
            data: { breadcrumb: "Match Settlement" },
          },
          {
            path: "marketinfo",
            component: MarketinfoComponent,
            data: { breadcrumb: "Market Info" },
          },
          {
            path: "sessioninfo",
            component: SessioninfoComponent,
            data: { breadcrumb: "Session Info" },
          },
          {
            path: "agentlist",
            component: AgentlistComponent,
            data: { breadcrumb: "Agent List" },
          },
          {
            path: "sportslist",
            component: SportslistComponent,
            data: { breadcrumb: "Sports List" },
          },
          {
            path: "reportlist",
            component: ReportslistComponent,
            data: { breadcrumb: "Report List" },
          },
          {
            path: "markets",
            component: MarketsComponent,
            data: { breadcrumb: "Markets" },
          },
          {
            path: "betting",
            loadChildren: () =>
              import("./lazyload/betting.module").then((m) => m.BettingModule),
          },
          {
            path: "fancyrate",
            component: FancyrateComponent,
            data: { breadcrumb: "Fancy Rate" },
          },
          {
            path: "bmrate",
            component: BmrateComponent,
            data: { breadcrumb: "Book Making Rate" },
          },
          {
            path: "markets_ctlg",
            data: { breadcrumb: "Markets Catelog" },
            loadChildren: () =>
              import("./lazyload/markets-catalogue.module").then(
                (m) => m.MarketsCatalogueModule
              ),
          },
          {
            path: "packages",
            loadChildren: () =>
              import("./lazyload/packages.module").then(
                (m) => m.PackagesModule
              ),
          },
          {
            path: "rules",
            component: RulesComponent,
            data: { breadcrumb: "Rules" },
          },
          {
            path: "changepassword",
            component: ChangepasswordComponent,
            data: { breadcrumb: "Change Password" },
          },
          {
            path: "userAnalysis",
            component: UseranalysisComponent,
            data: { breadcrumb: "User Analysis" },
          },
          {
            path: "ScoreInput/:matchId",
            component: ScoreInputComponent,
            data: { breadcrumb: "Score Input" },
          },
          {
            path: "addscore",
            component: AddscoreComponent,
            data: { breadcrumb: "Add Score" },
          },
          {
            path: "Scorelist",
            component: ScoreListComponent,
            data: { breadcrumb: "Score List" },
          },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const componentRouting = [
  HomeComponent,
  TournamentComponent,
  DashboardComponent,
  LivereportComponent,
  MatchsettlementComponent,
  MarketinfoComponent,
  SessioninfoComponent,
  AgentlistComponent,
  SportslistComponent,
  ReportslistComponent,
  MarketsComponent,
  MatchsettingComponent,
  EvenoddComponent,
  BalanceComponent,
  FancyrateComponent,
  BmrateComponent,
  RulesComponent,
  ChangepasswordComponent,
  UseranalysisComponent,
  ScoreInputComponent,
  ScoreListComponent,
  AddscoreComponent,
];
