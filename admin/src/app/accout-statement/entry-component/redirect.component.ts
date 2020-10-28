import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  template: `
    <ng-container *ngIf="currentRoute == '/report/accountstatement'">
      <a *ngIf="data.type=='P|L Market'">
        {{ data.description }}
      </a>
      <span *ngIf="data.type!='P|L Market'">{{ data.description }}</span>
    </ng-container>
    <ng-container *ngIf="currentRoute == '/report/accountstatement/'+userId+'/'+Uname">
      <a *ngIf="data.type=='P|L Market'">
        {{ data.description }}
      </a>
      <span *ngIf="data.type!='P|L Market'">{{ data.description }}</span>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/report/ADMINmdlmktprofitloss')">
      <a [routerLink]="['/report/MDLwiseDLpnl/',data.mdlid,data.Mtid,data.mktid,data.type]">
        {{ data.username }}
      </a>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/report/MDLwiseDLpnl')">
      <a [routerLink]="['/report/DlwiseClientpnl/',data.dlid,data.Mtid,data.mktid,data.type]">
        {{ data.dlusername }}
      </a>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/report/DlwiseClientpnl')">
      <a [routerLink]="['/report/innerClientbetHistory/',data.clid,data.Mtid,data.mktid,data.type]">

        {{ data.clusername }}
      </a>
    </ng-container>
     `
})
export class redirectComponent {
  currentRoute = null;
  data = null;
  parentComponent;
  type = null;
  refid;
  userId: any;
  Uname: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    this.route.params.subscribe(params => {
    this.refid=params.refid;
    this.userId=params.userId;
    this.Uname=params.Uname;
    console.log(params);
    });
  }

  // <a *ngIf="data.type=='P|L Market'" [routerLink]="['/report/ADMINmdlmktprofitloss/',data.refid]">
  //       {{ data.description }}
  //     </a>

  agInit(params) {
    this.data = params.data;
    console.log(this.data)
    this.parentComponent = params.context.componentParent.constructor.name;
   console.log(this.parentComponent)
  }
}
