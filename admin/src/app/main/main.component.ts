import { Component, Inject, OnInit } from "@angular/core";
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from "@angular/material/bottom-sheet";
import { LoginService } from "../services/login.service";
import { NotificationService } from "../shared/notification.service";
import { TokenService } from "../services/token.service";
import { UsermanagementService } from "../services/usermanagement.service";
import { SharedataService } from "../services/sharedata.service";
import { AnalysisSignalrService } from "../services/analysis-signalr.service";
import { TickerService } from "../services/ticker.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  userType: any;
  tickerList: any;
  betingstatus: any;
  AccountInfo: any;
  intervalId: any;
  currencyType = environment.baseSite.currency;
  availbalance: string;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loginService: LoginService,
    private tokenService: TokenService,
    private notifyService: NotificationService,
    private sharedata: SharedataService,
    private usermanagement: UsermanagementService,
    private analysisservice: AnalysisSignalrService,
    private ticker: TickerService,
    private router: Router,
    public dialog: MatDialog,
    private locationStrategy: LocationStrategy
  ) {}

  ngOnInit() {
    this.ticker.GetTickerList().subscribe((resp) => {
      // console.log(resp)
      this.tickerList = resp.tickerList;
    });
    this.getBetStatus();
    this.UserInfo("0");
    this.userType = this.tokenService.getUserType();
    console.log(this.userType);
    this.intervalId = setInterval(() => this.UserInfo("1"), 5000);

    if (
      this.tokenService.getToken() != undefined ||
      this.tokenService.getToken() != null
    ) {
      history.pushState(null, null, location.href);
      this.locationStrategy.onPopState(() => {
        history.pushState(null, null, location.href);
      });
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  UserInfo(flag) {
    this.usermanagement.getAccountInfo().subscribe((resp) => {
      this.AccountInfo = resp.data;
      this.sharedata.shareAccountInfo(resp.data);
      if (flag == "0") {
        let address = "http://173.249.43.228:11334";
        this.analysisservice.connectAnalysis(address, resp.data.userId);
      }
      if (this.AccountInfo) {
        let availbalance = parseFloat(this.AccountInfo.remainingLimit);
        if (this.currencyType == "INR") {
          this.availbalance = availbalance.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        if (this.currencyType == "USD") {
          this.availbalance = availbalance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
        if (this.currencyType == "HKD") {
          this.availbalance = availbalance.toLocaleString("en-HK", {
            style: "currency",
            currency: "HKD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        }
      }
    });
  }

  Logout() {
    this.loginService.Logout().subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.tokenService.removeToken();
        this.tokenService.removeUserType();
        this.router.navigate(["/login"]);
        // window.location.reload();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }

  openconfirmDialog(flag): void {
    var data = {
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
          this.upadateBettingstatus(result.type);
        } else {
          this.upadateBettingstatus(result.type);
        }
      }
    });
  }

  upadateBettingstatus(status) {
    this.usermanagement.UpdateBettingStatus(status).subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.getBetStatus();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }

  getBetStatus() {
    this.usermanagement.GetBettingStatus().subscribe((resp) => {
      this.betingstatus = resp.status;
    });
  }
}

@Component({
  selector: "confirmdialog",
  template: `<h1 mat-dialog-title>Confirm Box</h1>
    <div mat-dialog-content>
      <p>Are you sure you want to Update the Betting Status ?</p>
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
  selector: "bottom-sheet",
  templateUrl: "../bottom-sheet/bottom-sheet.html",
})
export class BottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
