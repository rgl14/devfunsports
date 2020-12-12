import { Injectable, OnInit } from '@angular/core';
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { ReportsService } from 'src/app/services/reports.service';
import { userDashboarPosition } from './userobjects';
import _ from 'lodash';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';

@Injectable({
  providedIn: 'root'
})
export class CompositionService {

  private userData:userDashboarPosition = {
    netSettlementAmount:0,
    totalCurrentExpo:0,
    totalProfitNLoss:0
   };
   date: Date;

  constructor(
    private userManagement:UsermanagementService,
    private reportService:ReportsService
  ) { }

  GetDashboardData(userid:number, creatorid:number, usertype:number): userDashboarPosition {
    
    this.userData.netSettlementAmount = 0;
    this.userData.totalCurrentExpo = 0;
    this.userData.totalProfitNLoss = 0;
    
    this.GetYesterdayPnL();
    switch(userid){
      case 1:
        this.AdmChipssummary();
        break;
      default:
        this.AdmChipssummary2(userid);
        break;
    }
    
    switch(usertype){
      case 1:
        //  For Double Super
        this.userManagement.getUserlist(2, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Super Master
        this.userManagement.getUserlist(3, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Master
        this.userManagement.getUserlist(4, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Agent
        this.userManagement.getUserlist(5, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });
        break;
      case 2:
        // For Super Master
        this.userManagement.getUserlist(3, creatorid).subscribe((resp) => {
          console.log(resp._data);
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Master
        this.userManagement.getUserlist(4, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Agent
        this.userManagement.getUserlist(5, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });
        break;
      case 3:
        // For Master
        this.userManagement.getUserlist(4, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });

        // For Agent
        this.userManagement.getUserlist(5, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });
        break;
      case 4:
        // For Agent
        this.userManagement.getUserlist(5, creatorid).subscribe((resp) => {
          resp._data.forEach((item)=>{
            this.userData.totalCurrentExpo += parseFloat(item.expoLimit);
          });
        });
        break;
    }

    return this.userData;
  }

  private AdmChipssummary(){
    this.reportService.GetAdmChipsSummary().subscribe((resp) => {

      _.forEach(resp.userInPlus, (item, index) => {
        this.userData.netSettlementAmount += parseFloat(item.balance);
      });

      _.forEach(resp.userInMinus,(item, index)=>{
        this.userData.netSettlementAmount -= parseFloat(item.balance);
      });
    });
  }
  
  private AdmChipssummary2(ID){
    this.reportService.GetAdmChipsSummary2(ID).subscribe((resp) => {
      console.log(resp);
      _.forEach(resp.userInPlus, (item, index) => {
        console.log(item.balance);
        this.userData.netSettlementAmount += parseFloat(item.balance);
      });

      _.forEach(resp.userInMinus,(item, index)=>{
        console.log(item.balance);
        this.userData.netSettlementAmount -= parseFloat(item.balance);
      });

    });
  }

  private GetYesterdayPnL(){
    var days = 1;
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        this.date = last
    let pnldates={
      "fromdate":this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00",
      "todate":date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + this.date.getDate() + " 23:59:59" 
    }
    this.reportService.GetProfitLoss('',pnldates).subscribe(resp =>{
      this.userData.totalProfitNLoss = resp.totalEarnings;
    });
  }
}
