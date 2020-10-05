import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AddbookComponent } from '../addbook/addbook.component';
import { BookmakerComponent } from '../bookmaker/bookmaker.component';
import { ChildrenContainerComponent } from '../shared/components/children-container.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: ChildrenContainerComponent,
    data: { breadcrumb: 'Bookmaker' },
    children: [
      {
        path: '',
        component: BookmakerComponent
      },
      {
        path: "addbook",
        component: AddbookComponent,
        data: { breadcrumb: "Add Book" },
      },
      {
        path: ":bookId/editbook",
        component: AddbookComponent,
        data: { breadcrumb: "Edit Book" },
      }
    ]
  }
]

@NgModule({
  declarations: [
    BookmakerComponent,
    AddbookComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    AgGridModule,
    SharedModule
  ]
})
export class BookmakerModule { }
