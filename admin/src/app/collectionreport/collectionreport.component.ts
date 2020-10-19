import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReportsService } from "../services/reports.service";
import _ from "lodash";
import { LimitsService } from "../services/limits.service";
import { NotificationService } from "../shared/notification.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: "app-collectionreport",
  templateUrl: "./collectionreport.component.html",
  styleUrls: ["./collectionreport.component.css"],
})
export class CollectionreportComponent implements OnInit {
  matchId: string;
  denaHai = [];
  lenaHai = [];
  clearHai = [];
  totallena: any;
  totaldena: any;
  totalclear: any;
  AccountInfo: any;
  Own: any;
  PlusAcc: any;
  MinusAcc: any;
  totalPlus: number;
  totalMinus: number;
  Cash: any;
  Commission: any;
  parentComm: any;
  parentName: any;
  parentPnl: any;
  userId: any;
  Uname: any;
  UserInfo: any;

  constructor(
    private usermanagement: UsermanagementService,
    private route: ActivatedRoute,
    private router: Router,
    private getreports: ReportsService,
    private limits: LimitsService,
    public notification: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get("matchId");
    this.route.params.subscribe(param => {
      console.log(param)
      if(param.userId!=undefined){
        this.userId=param.userId;
        this.Uname=param.Uname;
      }else{
        this.userId=0;
      }
    })
    // this.Collectionreport();
    this.Accountinfo();
  }

  Accountinfo(){
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.AccountInfo = resp.data;
      // console.log(this.AccountInfo)
      if(this.AccountInfo.userType==1){
        this.AdmChipssummary()
      }else{
        if(this.userId==0){
          this.AdmChipssummary2(this.AccountInfo.userId)
        }else{
          this.AdmChipssummary2(this.userId)
        }
      }
    })
  }

  AdmChipssummary(){
    this.getreports.GetAdmChipsSummary().subscribe((resp) => {
      console.log(resp);
      this.Own=resp.own;
      this.Cash=resp.cash;
      this.Commission=resp.comm;
      this.PlusAcc = resp.userInPlus;
      this.MinusAcc = resp.userInMinus;
      this.totalPlus = 0.0;
      this.totalMinus = 0.0;
      _.forEach(this.PlusAcc, (itemdena, index) => {
        this.totalPlus = this.totalPlus + parseFloat(itemdena.amount);
      });
      _.forEach(this.MinusAcc, (itemlena, index) => {
        this.totalMinus = this.totalMinus + parseFloat(itemlena.amount);
      });
    })
  }
  AdmChipssummary2(ID){
    this.getreports.GetAdmChipsSummary2(ID).subscribe((resp) => {
      console.log(resp);
      this.Own=resp.own;
      this.Cash=resp.cash;
      this.Commission=resp.comm;
      this.parentComm=resp.parentComm;
      this.parentName=resp.parentName;
      this.parentPnl=resp.parentPnl;
      this.PlusAcc = resp.userInPlus;
      this.MinusAcc = resp.userInMinus;
      this.totalPlus = 0.0;
      this.totalMinus = 0.0;
      _.forEach(this.PlusAcc, (itemdena, index) => {
        this.totalPlus = this.totalPlus + parseFloat(itemdena.amount);
      });
      _.forEach(this.MinusAcc, (itemlena, index) => {
        this.totalMinus = this.totalMinus + parseFloat(itemlena.amount);
      });
    })
  }
  // Collectionreport() {
  //   this.getreports.GetCollectionReport().subscribe((resp) => {
  //     this.denaHai = resp.denaHai;
  //     this.lenaHai = resp.lenaHai;
  //     this.clearHai = resp.clearHai;
  //     this.totallena = 0.0;
  //     this.totaldena = 0.0;
  //     this.totalclear = 0.0;
  //     _.forEach(this.lenaHai, (itemdena, index) => {
  //       this.totallena = this.totallena + parseFloat(itemdena.amount);
  //     });
  //     _.forEach(this.denaHai, (itemlena, index) => {
  //       this.totaldena = this.totaldena + parseFloat(itemlena.amount);
  //     });
  //     _.forEach(this.clearHai, (itemclear, index) => {
  //       this.totalclear = this.totalclear + parseFloat(itemclear.amount);
  //     });
  //   });
  // }

  clearcash(userid, amount, type) {
    if (type == 1) {
      let data = {
        USERID: userid,
        AMOUNT: amount,
      };
      // console.log(data,type)
      this.clearRecevcash(data);
    } else {
      let data = {
        USERID: userid,
        AMOUNT: amount * -1,
      };
      // console.log(data,type)
      this.clearpaycash(data);
    }
  }

  clearRecevcash(data) {
    this.limits.ReceiveCash(data).subscribe((resp) => {
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        // this.Collectionreport();
        setTimeout(() => {
          this.router.navigateByUrl("/report/collectionreport");
        }, 2000);
      } else {
        this.notification.error(resp.result);
      }
    });
  }
  clearpaycash(data) {
    this.limits.PayCash(data).subscribe((resp) => {
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        // this.Collectionreport();
        setTimeout(() => {
          this.router.navigateByUrl("/report/collectionreport");
        }, 2000);
      } else {
        this.notification.error(resp.result);
      }
    });
  }

  openconfirmDialog(userType,amt,uname,type): void {
    var settle={
      "amount": Math.abs(parseFloat(amt)),
      "receiverUn":(type==1)?this.AccountInfo.userName:uname,
      "remarks":(type==1)? this.AccountInfo.userName+" Recieved Cash From "+uname : this.AccountInfo.userName+" Paid Cash To "+uname,
      "senderUn":(type==1)?uname:this.AccountInfo.userName,
      "userType":userType,
      "LoggeduserType":this.AccountInfo.userType,
      "type":type
    }
    console.log(settle);

    const dialogRef = this.dialog.open(ConfirmBoxDialog, {
      width: '250px',
      data:settle,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined){
        var data={
          "amount": result.amount,
          "receiverUn":result.receiverUn,
          "remarks":result.remarks,
          "senderUn":result.senderUn
        };
        if(result.LoggeduserType==1 && result.userType==2){
          this.limits.SettleCompanyDoubleSuperCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==3){
          this.limits.SettleCompanySuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==4){
          this.limits.SettleCompanyMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==5){
          this.limits.SettleCompanyAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==3){
          this.limits.SettleDoubleSupSuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==4){
          this.limits.SettleDoubleSuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==5){
          this.limits.SettleDoubleSuperAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==4){
          this.limits.SettleSuperMasterMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==5){
          this.limits.SettleSuperMasterAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==6){
          this.limits.SettleSuperMasterClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==4 && result.userType==5){
          this.limits.SettleMasterAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==4 && result.userType==6){
          this.limits.SettleMasterClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==5 && result.userType==6){
          this.limits.SettleAgentClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
      }
    });
  }

  openPartialPaymentDialog(userType,amt,uname,type): void {
    var settle={
      "amount": Math.abs(parseFloat(amt)),
      "receiverUn":(type==1)?this.AccountInfo.userName:uname,
      "remarks":(type==1)? this.AccountInfo.userName+" Recieved Cash From "+uname : this.AccountInfo.userName+" Paid Cash To "+uname,
      "senderUn":(type==1)?uname:this.AccountInfo.userName,
      "userType":userType,
      "LoggeduserType":this.AccountInfo.userType,
      "type":type
    }
    console.log(settle);

    const dialogRef = this.dialog.open(PartialPaymentDialog, {
      width: '350px',
      data:settle,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined){
        var data={
          "amount": result.amount,
          "receiverUn":result.receiverUn,
          "remarks":result.remarks,
          "senderUn":result.senderUn
        };
        if(result.LoggeduserType==1 && result.userType==2){
          this.limits.SettleCompanyDoubleSuperCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==3){
          this.limits.SettleCompanySuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==4){
          this.limits.SettleCompanyMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==1 && result.userType==5){
          this.limits.SettleCompanyAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==3){
          this.limits.SettleDoubleSupSuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==4){
          this.limits.SettleDoubleSuperMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==2 && result.userType==5){
          this.limits.SettleDoubleSuperAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==4){
          this.limits.SettleSuperMasterMasterCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==5){
          this.limits.SettleSuperMasterAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==3 && result.userType==6){
          this.limits.SettleSuperMasterClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==4 && result.userType==5){
          this.limits.SettleMasterAgentCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==4 && result.userType==6){
          this.limits.SettleMasterClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
        if(result.LoggeduserType==5 && result.userType==6){
          this.limits.SettleAgentClientCash(data).subscribe((resp)=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              this.Accountinfo();
            } else {
              this.notification.error(resp.result);
            }
          })
        }
      //   this.AccountInfo;
      //     let settledata={
      //       "amount": Math.abs(parseFloat(result.amount)),
      //       "receiverUn":result.receiverUn,
      //       "remarks":result.remarks,
      //       "senderUn":result.senderUn
      //     }
      //     this.clearRecevcash(settledata);
      }
    });
  }
}

@Component({
  selector: 'confirmdialog',
  templateUrl: 'confirm-clear-box.html',
})
export class ConfirmBoxDialog {
  params: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'partial-payment',
  templateUrl: 'partial-payment-box.html',
})
export class PartialPaymentDialog {
  params: any;
  Amount:any;
  totalBalance:any;
  constructor(
    public dialogRef: MatDialogRef<PartialPaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }
    modelChangeFn(e,data){
      this.Amount = e;
      this.totalBalance=parseFloat(data.amount)-e;
      console.log(this.Amount);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
}


