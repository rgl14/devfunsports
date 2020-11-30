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
    <ng-container *ngIf="currentRoute == '/report/accountstatement/'+userId+'/'+Uname+'/'+Type">
      <a *ngIf="data.type=='P|L Market'">
        {{ data.description }}
      </a>
      <span *ngIf="data.type!='P|L Market'">{{ data.description }}</span>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/ADMINmdlmktprofitloss')">
      <a   [routerLink]="['MDLwiseDLpnl',data.mdlid,data.Mtid,data.mktid,data.type]">
        {{ data.username }}
      </a>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/MDLwiseDLpnl')">
      <a  [routerLink]="[ 'DlwiseClientpnl',data.dlid,data.Mtid,data.mktid,data.type]">
        {{ data.dlusername }}
      </a>
    </ng-container>
    <ng-container *ngIf="currentRoute.includes('/DlwiseClientpnl')">
      <a  [routerLink]="['innerClientbetHistory',data.clid,data.Mtid,data.mktid,data.type]">

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
  Type: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentRoute = this.router.url;
    this.route.params.subscribe(params => {
    this.refid=params.refid;
    this.userId=params.userId;
    this.Uname=params.Uname;
    this.Type=params.type;
    });
  }

  // <a *ngIf="data.type=='P|L Market'" [routerLink]="['/report/ADMINmdlmktprofitloss/',data.refid]">
  //       {{ data.description }}
  //     </a>

  agInit(params) {
    this.data = params.data;
    this.parentComponent = params.context.componentParent.constructor.name;
  }
}
