import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportsService } from "../services/reports.service";
import { LimitsService } from "../services/limits.service";
import { NotificationService } from "../shared/notification.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import _ from "lodash";

@Component({
  selector: "app-clientcollectionreport",
  templateUrl: "./clientcollectionreport.component.html",
  styleUrls: ["./clientcollectionreport.component.css"],
})
export class ClientcollectionreportComponent implements OnInit {
  matchId: string;
  denaHai = [];
  lenaHai = [];
  totallena = 0;
  totaldena = 0;
  constructor(
    private route: ActivatedRoute,
    private getreports: ReportsService,
    private limits: LimitsService,
    public notification: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get("matchId");
    this.Collectionreport();
  }

  Collectionreport() {
    this.getreports.GetMatchCollectionReport(this.matchId).subscribe((resp) => {
      console.log(resp);
      this.denaHai = resp.denaHai;
      this.lenaHai = resp.lenaHai;
      this.totallena = 0.0;
      this.totaldena = 0.0;
      _.forEach(this.lenaHai, (itemdena, index) => {
        this.totallena = this.totallena + parseFloat(itemdena.amount);
      });
      _.forEach(this.denaHai, (itemlena, index) => {
        this.totaldena = this.totaldena + parseFloat(itemlena.amount);
      });
    });
  }

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
        this.Collectionreport();
      } else {
        this.notification.error(resp.result);
      }
    });
  }
  clearpaycash(data) {
    this.limits.PayCash(data).subscribe((resp) => {
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        this.Collectionreport();
      } else {
        this.notification.error(resp.result);
      }
    });
  }
  openconfirmDialog(id, amt, flag): void {
    var data = {
      uid: id,
      amount: amt,
      type: flag,
    };
    console.log(data);

    const dialogRef = this.dialog.open(ConfirmBoxDialog, {
      width: "250px",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        if (result.type == 1) {
          let lena = {
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

  openPartialPaymentDialog(id, amt, flag): void {
    var data = {
      uid: id,
      totalBalance: Math.abs(parseFloat(amt)),
      type: flag,
      amount: Math.abs(parseFloat(amt)),
    };
    console.log(data);

    const dialogRef = this.dialog.open(PartialPaymentDialog, {
      width: "350px",
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        if (result.type == 1) {
          let lena = {
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
  selector: "confirmdialog",
  template: `<h1 mat-dialog-title>Confirm Box</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to clear whole amount ?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data"
        cdkFocusInitial
      >
        Ok
      </button>
    </div>`,
})
export class ConfirmBoxDialog {
  params: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "partial-payment",
  template: `<h1 mat-dialog-title>Settlement</h1>
    <div mat-dialog-content>
      <div class="mb-2" style="display: flex; flex-flow: column">
        <p>Enter {{ data.type === 1 ? "Receive" : "Payment" }} cash amount:</p>
        <input type="text" matInput [(ngModel)]="data.amount" />

        <div class="mt-1">
          <span>Total Balance</span>:
          {{ (data.totalBalance - data.amount).toFixed(2) }}
        </div>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data"
        cdkFocusInitial
      >
        Ok
      </button>
    </div>`,
})
export class PartialPaymentDialog {
  params: any;
  constructor(
    public dialogRef: MatDialogRef<PartialPaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
