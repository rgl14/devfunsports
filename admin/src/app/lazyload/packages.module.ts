import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageSettingsComponent } from '../package-settings/package-settings.component';
import { CreatePackageComponent } from '../create-package/create-package.component';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenContainerComponent } from '../shared/components/children-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatButtonModule, MatIconModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: ChildrenContainerComponent,
    data: { breadcrumb: "Packages" },
    children: [
      {
        path: '',
        component: PackageSettingsComponent,
      },
      {
        path: "create_pckg",
        component: CreatePackageComponent,
        data: { breadcrumb: "Create Package" },
      },
      {
        path: ":packageId/edit_pckg",
        component: CreatePackageComponent,
        data: { breadcrumb: "Edit Package" },
      },
    ]
  }
]

@NgModule({
  declarations: [
    PackageSettingsComponent,
    CreatePackageComponent
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
export class PackagesModule { }
