import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
} from "@angular/material";
import { Route, RouterModule, Routes } from "@angular/router";
import { AgGridModule } from "ag-grid-angular";
import { AdminComponent } from "../admin/admin.component";
import { AgentComponent } from "../agent/agent.component";
import { allClientsComponent } from "../allclients/allclients.component";
import { BlockedclientsComponent } from "../blockedclients/blockedclients.component";
import { CashledgerComponent } from "../cashledger/cashledger.component";
import { ClientsComponent } from "../clients/clients.component";
import { CoinhistoryComponent } from "../coinhistory/coinhistory.component";
import { CreateadminComponent } from "../createadmin/createadmin.component";
import { CreateagentComponent } from "../createagent/createagent.component";
import { CreateclientComponent } from "../createclient/createclient.component";
import { CreatemasterComponent } from "../createmaster/createmaster.component";
import { CreatesuperComponent } from "../createsuper/createsuper.component";
import { CreatesuperagentComponent } from "../createsuperagent/createsuperagent.component";
import { ManagepasswordComponent } from "../managepassword/managepassword.component";
import { MasterComponent } from "../master/master.component";
import { MatchledgerComponent } from "../matchledger/matchledger.component";
import { PaycashComponent } from "../paycash/paycash.component";
import { RecevcashComponent } from "../recevcash/recevcash.component";
import { ChildrenContainerComponent } from "../shared/components/children-container.component";
import { SharedModule } from "../shared/shared.module";
import { SuperagentComponent } from "../superagent/superagent.component";
import { SupermasterComponent } from "../supermaster/supermaster.component";
import { TableList } from "../updatelimit/table/table.componet";
import { UpdatelimitComponent } from "../updatelimit/updatelimit.component";
import { UserdashboardComponent } from "../userdashboard/userdashboard.component";
import { UserledgerComponent } from "../userledger/userledger.component";

const dashboardRoutes: Routes = [
  {
    path: "recevcash/:userId/:userName/:name",
    component: RecevcashComponent,
    data: { breadcrumb: "Receive Cash" },
  },
  {
    path: "paycash/:userId/:userName/:name",
    component: PaycashComponent,
    data: { breadcrumb: "Pay Cash" },
  },
  {
    path: "userledger/:userId",
    component: UserledgerComponent,
    data: { breadcrumb: "User Ledger" },
  },
  {
    path: "cashledger/:userId",
    component: CashledgerComponent,
    data: { breadcrumb: "Cash Ledger" },
  },
  {
    path: "coinhistory/:userId",
    component: CoinhistoryComponent,
    data: { breadcrumb: "Coin History" },
  },
  {
    path: "matchledger/:userId",
    component: MatchledgerComponent,
    data: { breadcrumb: "Match Ledger" },
  },
];

const clientRoute: Route = {
  path: ":userId/clients",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Clients" },
  children: [
    {
      path: "",
      component: ClientsComponent,
    },
    {
      path: "create",
      component: CreateclientComponent,
      data: { breadcrumb: "Create Client" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: ClientsComponent,
        //   data: { breadcrumb: "Clients" },
        // },
        {
          path: "edit",
          component: CreateclientComponent,
          data: { breadcrumb: "Edit Client" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
              ],
            },
          ],
        },
      ],
    },
  ],
};

const allclientRoute: Route = {
  path: "allclients",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "ALL Clients" },
  children: [
    {
      path: "",
      component: allClientsComponent,
    },
    {
      path: ":userId",
      children: [
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
              ],
            },
          ],
        },
      ],
    },
  ],
};



const agentRoute: Route = {
  path: ":userId/agent",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Agents" },
  children: [
    {
      path: "",
      component: AgentComponent,
    },
    {
      path: "create",
      component: CreateagentComponent,
      data: { breadcrumb: "Create Super Agent" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: AgentComponent,
        // },
        {
          path: "edit",
          component: CreateagentComponent,
          data: { breadcrumb: "Agent" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            clientRoute,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
                clientRoute,
              ],
            },
          ],
        },
      ],
    },
  ],
};

const superAgentRoute = {
  path: ":userId/superagent",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Super Agents" },
  children: [
    {
      path: "",
      component: SuperagentComponent,
    },
    {
      path: "create",
      component: CreatesuperagentComponent,
      data: { breadcrumb: "Create" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: SuperagentComponent,
        // },
        {
          path: "edit",
          component: CreatesuperagentComponent,
          data: { breadcrumb: "Edit" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            agentRoute,
            clientRoute,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
                agentRoute,
                clientRoute,
              ],
            },
          ],
        },
      ],
    },
  ],
};

const masterRoute: Route = {
  path: ":userId/master",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Masters" },
  children: [
    {
      path: "",
      component: MasterComponent,
    },
    {
      path: "create",
      component: CreatemasterComponent,
      data: { breadcrumb: "Create Master" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: MasterComponent,
        // },
        {
          path: "edit",
          component: CreatemasterComponent,
          data: { breadcrumb: "Edit Master" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            superAgentRoute,
            agentRoute,
            clientRoute,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
                superAgentRoute,
                agentRoute,
                clientRoute,
              ],
            },
          ],
        },
      ],
    },
  ],
};

const superMasterRoute: Route = {
  path: ":userId/supermaster",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Super Masters" },
  children: [
    {
      path: "",
      component: SupermasterComponent,
    },
    {
      path: "create",
      component: CreatesuperComponent,
      data: { breadcrumb: "Create Super Master" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: SupermasterComponent,
        // },
        {
          path: "edit",
          component: CreatesuperComponent,
          data: { breadcrumb: "Edit Super Master" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            masterRoute,
            superAgentRoute,
            agentRoute,
            clientRoute,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
                masterRoute,
                superAgentRoute,
                agentRoute,
                clientRoute,
              ],
            },
          ],
        },
      ],
    },
  ],
};

const adminRoutes = {
  path: ":userId/admin",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Double Supers" },
  children: [
    {
      path: "",
      component: AdminComponent,
    },
    {
      path: "create",
      component: CreateadminComponent,
      data: { breadcrumb: "Create Double Supers" },
    },
    {
      path: ":userId",
      children: [
        // {
        //   path: "",
        //   component: AdminComponent,
        // },
        {
          path: "edit",
          component: CreateadminComponent,
          data: { breadcrumb: "Edit Double Super" },
        },
        {
          path: "managepassword",
          component: ManagepasswordComponent,
          data: { breadcrumb: "Manage Password" },
        },
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            superMasterRoute,
            masterRoute,
            superAgentRoute,
            agentRoute,
            clientRoute,
          ],
        },
      ],
    },
  ],
};
const blockedclientRoute: Route = {
  path: "blockedclient",
  component: ChildrenContainerComponent,
  data: { breadcrumb: "Blocked Clients" },
  children: [
    {
      path: "",
      component: BlockedclientsComponent,
    },
    {
      path: ":userId",
      children: [
        {
          path: "userdashboard",
          component: ChildrenContainerComponent,
          data: { breadcrumb: "Dashboard" },
          children: [
            {
              path: "",
              component: UserdashboardComponent,
            },
            ...dashboardRoutes,
            adminRoutes,
            superMasterRoute,
            masterRoute,
            superAgentRoute,
            agentRoute,
            clientRoute,
          ],
        },
        {
          path: ":userId",
          children: [
            {
              path: "userdashboard",
              component: ChildrenContainerComponent,
              data: { breadcrumb: "Dashboard" },
              children: [
                {
                  path: "",
                  component: UserdashboardComponent,
                },
                ...dashboardRoutes,
      adminRoutes,
      superMasterRoute,
      masterRoute,
      superAgentRoute,
      agentRoute,
      clientRoute,
              ],
            },
            
          ],
        },
      ],
    },
  ],
};

const routes: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Manage Clients",
    },
    children: [
      adminRoutes,
      superMasterRoute,
      masterRoute,
      superAgentRoute,
      agentRoute,
      clientRoute,
      allclientRoute,
      blockedclientRoute,
      // {
      //   path: "blockedclient",
      //   component: BlockedclientsComponent,
      //   data: { breadcrumb: "Blocked Client" },
      // },
      {
        path: "updatelimit",
        component: UpdatelimitComponent,
        data: { breadcrumb: "Update Limit" },
      },
      // {
      //   path: "allclients",
      //   component: allClientsComponent,
      //   data: { breadcrumb: "All Clients" },
      // },
    ],
  },
  {
    path: ":userId/userdashboard",
    component: ChildrenContainerComponent,
    data: {
      breadcrumb: "User Dashboard",
    },
    children: [
      {
        path: "",
        component: UserdashboardComponent,
      },
      ...dashboardRoutes,
      adminRoutes,
      superMasterRoute,
      masterRoute,
      superAgentRoute,
      agentRoute,
      clientRoute,
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    SupermasterComponent,
    CreatesuperComponent,
    MasterComponent,
    CreatemasterComponent,
    SuperagentComponent,
    CreatesuperagentComponent,
    AgentComponent,
    CreateagentComponent,
    ClientsComponent,
    CreateclientComponent,
    UpdatelimitComponent,
    BlockedclientsComponent,
    CreateadminComponent,
    ManagepasswordComponent,
    UserdashboardComponent,
    RecevcashComponent,
    PaycashComponent,
    UserledgerComponent,
    CashledgerComponent,
    CoinhistoryComponent,
    MatchledgerComponent,
    TableList,
    allClientsComponent,
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
    MatCardModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class ManageClientsModule {}
