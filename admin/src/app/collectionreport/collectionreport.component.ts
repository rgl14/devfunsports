import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReportsService } from "../services/reports.service";
import _ from "lodash";
import { LimitsService } from "../services/limits.service";
import { NotificationService } from "../shared/notification.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UsermanagementService } from '../services/usermanagement.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        this.Accountinfo();
      }else{
        this.userId=0;
        this.Accountinfo();
      }
    })
    // this.Collectionreport();
  }

  Accountinfo(){
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.AccountInfo = resp.data;
      // console.log(this.AccountInfo)
      if(this.AccountInfo.userType==1){
        if(this.userId==0){
          this.AdmChipssummary()
        }else{
          this.AdmChipssummary2(this.userId)
        }
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
        this.totalPlus = this.totalPlus + parseFloat(itemdena.balance);
      });
      _.forEach(this.MinusAcc, (itemlena, index) => {
        this.totalMinus = this.totalMinus + parseFloat(itemlena.balance);
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
        this.totalPlus = this.totalPlus + parseFloat(itemdena.balance);
      });
      _.forEach(this.MinusAcc, (itemlena, index) => {
        this.totalMinus = this.totalMinus + parseFloat(itemlena.balance);
      });
    })
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
    // console.log(settle);

    const dialogRef = this.dialog.open(ConfirmBoxDialog, {
      width: '250px',
      data:settle,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result!=undefined){
        
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
    // console.log(settle);

    const dialogRef = this.dialog.open(PartialPaymentDialog, {
      width: '350px',
      data:settle,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
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
  CashsettleForm: FormGroup;
  params: any;
  Amount:any;
  totalBalance:any;
  disabled:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<PartialPaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private limits: LimitsService,public notification: NotificationService,) {
      this.CashsettleForm = this.fb.group({
        Amount: [this.data.amount, Validators.required],
        Remark: [this.data.remarks]
      });
      this.formControlchanged();
    }
    
    formControlchanged() {
      this.CashsettleForm.get("Amount").valueChanges.subscribe((mode: any) => {
          if (mode > this.data.amount){
            if(this.data.amount>=0){
              this.CashsettleForm.controls["Amount"].setValue(this.data.amount);
              this.totalBalance=this.data.amount;
            }
        }else{
            this.totalBalance = parseFloat(this.data.amount) - mode;
        }
      });
    }

    Cashsettle(result){
    var data={
      "amount": this.CashsettleForm.get("Amount").value,
      "receiverUn":result.receiverUn,
      "remarks":this.CashsettleForm.get("Remark").value,
      "senderUn":result.senderUn
    };
    if(result.LoggeduserType==1 && result.userType==2){
      this.limits.SettleCompanyDoubleSuperCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
          this.dialogRef.close(data);
          this.disabled=false
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==1 && result.userType==3){
      this.limits.SettleCompanySuperMasterCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==1 && result.userType==4){
      this.limits.SettleCompanyMasterCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==1 && result.userType==5){
      this.limits.SettleCompanyAgentCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==2 && result.userType==3){
      this.limits.SettleDoubleSupSuperMasterCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==2 && result.userType==4){
      this.limits.SettleDoubleSuperMasterCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==2 && result.userType==5){
      this.limits.SettleDoubleSuperAgentCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==3 && result.userType==4){
      this.limits.SettleSuperMasterMasterCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==3 && result.userType==5){
      this.limits.SettleSuperMasterAgentCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==3 && result.userType==6){
      this.limits.SettleSuperMasterClientCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==4 && result.userType==5){
      this.limits.SettleMasterAgentCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==4 && result.userType==6){
      this.limits.SettleMasterClientCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
    if(result.LoggeduserType==5 && result.userType==6){
      this.limits.SettleAgentClientCash(data).subscribe((resp)=>{
        if (resp.status == "Success") {
          this.notification.success(resp.result);
          // this.Accountinfo();
        } else {
          this.notification.error(resp.result);
        }
      })
    }
  }

    onNoClick(): void {
      this.dialogRef.close();
    }
}


