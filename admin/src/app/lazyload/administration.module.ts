import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { AddroleComponent } from "../addrole/addrole.component";
import { AdduserComponent } from "../adduser/adduser.component";
import { AdministrationComponent } from "../administration/administration.component";
import { RolelistComponent } from "../rolelist/rolelist.component";
import { ChildrenContainerComponent } from "../shared/components/children-container.component";
import { SharedModule } from "../shared/shared.module";
import { UserlistComponent } from "../userlist/userlist.component";

const routes: Routes = [
  {
    path: "index",
    component: ChildrenContainerComponent,
    // pathMatch: "full",
    data: { breadcrumb: "Administration" },
    children: [
      {
        path: "",
        component: AdministrationComponent,
      },
      {
        path: "rolelist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "Role List" },
        children: [
          {
            path: "",
            component: RolelistComponent,
          },
          {
            path: "addrole",
            component: AddroleComponent,
            data: { breadcrumb: "Add Role" },
          },
          {
            path: "addrole/:roleId",
            component: AddroleComponent,
            data: { breadcrumb: "Add Role" },
          },
        ],
      },
      {
        path: "userlist",
        component: ChildrenContainerComponent,
        data: { breadcrumb: "User List" },
        children: [
          {
            path: "",
            component: UserlistComponent,
          },
          {
            path: "adduser",
            component: AdduserComponent,
            data: { breadcrumb: "Add User" },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdministrationComponent,
    RolelistComponent,
    RolelistComponent,
    UserlistComponent,
    AdduserComponent,
    AddroleComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    MatIconModule,
    AgGridModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
  ],
})
export class AdministrationModule {}
