import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { AddmarketComponent } from "../addmarket/addmarket.component";
import { AddmatchComponent } from "../addmatch/addmatch.component";
import { AddsportComponent } from "../addsport/addsport.component";
import { AddtournamentComponent } from "../addtournament/addtournament.component";
import { BettingComponent } from "../betting/betting.component";
import { MarketlistComponent } from "../marketlist/marketlist.component";
import { MatchlistComponent } from "../matchlist/matchlist.component";
import { ChildrenContainerComponent } from "../shared/components/children-container.component";
import { SharedModule } from "../shared/shared.module";
import { SportlistComponent } from "../sportlist/sportlist.component";
import { TournamentlistComponent } from "../tournamentlist/tournamentlist.component";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index'
  },
  {
    path: "index",
    component: ChildrenContainerComponent,
    data: { breadcrumb: 'Betting' },
    children: [
      {
        path: "",
        component: BettingComponent,
      },
      {
        path: "sportlist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Sport List" },
        children: [
          {
            path: "",
            component: SportlistComponent,
          },
          {
            path: "addsport",
            component: AddsportComponent,
            data: { breadcrumb: "Add Sport" },
          },
        ],
      },
      {
        path: "tournamentlist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Tournament List" },
        children: [
          {
            path: "",
            component: TournamentlistComponent,
          },
          {
            path: "addtournament",
            component: AddtournamentComponent,
            data: { breadcrumb: "Add Tournament" },
          },
        ],
      },
      {
        path: "matchlist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Match List" },
        children: [
          {
            path: "",
            component: MatchlistComponent,
          },
          {
            path: "addmatch",
            component: AddmatchComponent,
            data: { breadcrumb: "Add Match" },
          },
        ],
      },
      {
        path: "marketlist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Market List" },
        children: [
          {
            path: "",
            component: MarketlistComponent,
          },
          {
            path: "addmarket",
            component: AddmarketComponent,
            data: { breadcrumb: "Add Market" },
          },
        ],
      },
    ],
  },
  // {
  //   path: "sportslist",
  //   component: SportslistComponent,
  //   data: { breadcrumb: "Sports List" },
  // },
];

@NgModule({
  declarations: [
    BettingComponent,
    SportlistComponent,
    TournamentlistComponent,
    MatchlistComponent,
    MarketlistComponent,
    AddsportComponent,
    AddtournamentComponent,
    AddmatchComponent,
    AddmarketComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    RouterModule.forChild(routes),
    AgGridModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    BsDatepickerModule.forRoot()
  ],
})
export class BettingModule {}
