import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCheckboxModule, MatButtonModule, MatRadioModule, MatSlideToggleModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChildrenContainerComponent } from '../shared/components/children-container.component';
import { FancyComponent } from '../fancy/fancy.component';
import { AddfancyComponent } from '../addfancy/addfancy.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
  },
  {
    path: "index",
    component: ChildrenContainerComponent,
    data: { breadcrumb: 'Fancy' },
    children: [
      {
        path: '',
        component: FancyComponent
      },
      {
        path: "addfancy",
        component: AddfancyComponent,
        data: { breadcrumb: "Add Fancy" },
      },
      {
        path: ":fancyId/editfancy",
        component: AddfancyComponent,
        data: { breadcrumb: "Edit Fancy" },
      }
    ]
  }
]

@NgModule({
  declarations: [
    FancyComponent,
    AddfancyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatIconModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class FancyModule { }
