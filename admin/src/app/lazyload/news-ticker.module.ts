import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewstickerComponent } from '../newsticker/newsticker.component';
import { AddnewsComponent } from '../addnews/addnews.component';
import { SharedModule } from '../shared/shared.module';
import { ChildrenContainerComponent } from '../shared/components/children-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index'
  },
  {
    path: 'index',
    component: ChildrenContainerComponent,
    children: [
      {
        path: '',
        component: NewstickerComponent
      },
      {
        path: "addnews",
        component: AddnewsComponent,
        data: { breadcrumb: "Add News" },
      },
      {
        path: "addnews/:id",
        component: AddnewsComponent,
        data: { breadcrumb: "Edit News" },
      },
    ]
  }
]

@NgModule({
  declarations: [NewstickerComponent, AddnewsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridModule,
    MatRadioModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class NewsTickerModule { }
