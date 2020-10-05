import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MarketCtlgComponent } from '../market-ctlg/market-ctlg.component';
import { MatExpansionModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: MarketCtlgComponent,
    data: { breadcrumb: "Markets Catelog" },
  },
]

@NgModule({
  declarations: [
    MarketCtlgComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MarketsCatalogueModule { }
