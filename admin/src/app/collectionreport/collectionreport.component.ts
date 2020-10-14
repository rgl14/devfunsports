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
    // this.Collectionreport();
    this.Accountinfo();
  }

  Accountinfo(){
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.AccountInfo = resp.data;
      console.log(this.AccountInfo)
      if(this.AccountInfo.userType==1){
        this.AdmChipssummary()
      }else{
        this.AdmChipssummary2(this.AccountInfo.userId)
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

  openconfirmDialog(id,amt,flag): void {
    var data={
      uid:id,
      amount:amt,
      type:flag
    }
    console.log(data);

    const dialogRef = this.dialog.open(ConfirmBoxDialog, {
      width: '250px',
      data:data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined){
        if (result.type == 1) {
          let lena={
            USERID: result.uid,
            AMOUNT: result.amount,
          };
          this.clearRecevcash(lena);
        } else {
          let dena = {
            USERID: result.uid,
            AMOUNT: result.amount * -1,
          };
          this.clearpaycash(dena);
        }
      }
    });
  }

  openPartialPaymentDialog(id,amt,flag): void {
    var data={
      uid:id,
      totalBalance: Math.abs(parseFloat(amt)),
      type:flag,
      amount: Math.abs(parseFloat(amt))
    }
    console.log(data);

    const dialogRef = this.dialog.open(PartialPaymentDialog, {
      width: '350px',
      data:data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result!=undefined){
        if (result.type == 1) {
          let lena={
            USERID: result.uid,
            AMOUNT: result.amount,
          };
          console.log(result);

          this.clearRecevcash(lena);
        } else {
          let dena = {
            USERID: result.uid,
            AMOUNT: result.amount,
          };
          this.clearpaycash(dena);
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
  params: any;
  constructor(
    public dialogRef: MatDialogRef<PartialPaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


