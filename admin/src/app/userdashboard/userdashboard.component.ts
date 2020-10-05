import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { SharedataService } from '../services/sharedata.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { BreadcrumbService } from 'angular-crumbs';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  userId: any;
  userName: any;
  name: any;
  ledgerbal: any;
  userType: any;
  LoggeduserType: any;
  amount: any;

  constructor(
    private route:ActivatedRoute,
    private getreports:ReportsService,
    private sharedata: SharedataService,
    private usermanagement:UsermanagementService,
    private breadcrumb: BreadcrumbService
    ) { }
  
  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.getclientLedgerBal();
    this.LoggedUserInfo();
    this.getreports.UserCollectionReport(this.userId).subscribe(resp=>{
      this.amount=resp.amount;
    })
  }

  getclientLedgerBal(){
    this.getreports.GetClientLedgerBal(this.userId).subscribe(resp=>{
      // console.log(resp.ledgerBal)
      this.ledgerbal=resp.ledgerBal;
    })
    this.usermanagement.getUserInfo(this.userId).subscribe(resp=>{
      // console.log(resp)
    this.userName=resp.data.userName;
    this.name=resp.data.name;
    this.userType=resp.data.userType;
    this.breadcrumb.changeBreadcrumb(this.route.snapshot, this.userName);
    })
  }

  LoggedUserInfo(){
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        // console.log(data)
        this.LoggeduserType=data.userType;
      }
    })
  }

}
