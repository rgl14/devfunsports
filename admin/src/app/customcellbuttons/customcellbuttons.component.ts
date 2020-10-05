import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FancyService } from "../services/fancy.service";
import { NotificationService } from "../shared/notification.service";
import { BookmakingService } from "../services/bookmaking.service";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { SportDataService } from "../services/sport-data.service";
import { UsermanagementService } from "../services/usermanagement.service";
import { TickerService } from "../services/ticker.service";
import { LimitsService } from "../services/limits.service";
import { ReportsService } from "../services/reports.service";
import { ScoreService } from "../services/score.service";

@Component({
  selector: "app-customcellbuttons",
  templateUrl: "./customcellbuttons.component.html",
  styleUrls: ["./customcellbuttons.component.css"],
})
export class CustomcellbuttonsComponent implements OnInit {
  data: any;
  currentroute: string;
  params: any;
  disabled: boolean = false;
  userId: string;
  sportBfId: string;
  matchBfId: string;
  title: string;
  colDef: any;
  teamname: string = "0";
  splitmatchname = [];
  MktSettingsPckgList = [];

  showActionButtons: boolean = false;
  mrketdata: { mktID: any; packagelist: any[] };
  selectedPkg: string;
  package: any;

  constructor(
    private router: Router,
    private fancyService: FancyService,
    private bmService: BookmakingService,
    private notifyService: NotificationService,
    private dialog: MatDialog,
    private sportService: SportDataService,
    private usermanagement: UsermanagementService,
    private newsticker: TickerService,
    private limits: LimitsService,
    private route: ActivatedRoute,
    private report: ReportsService,
    private scoreinput: ScoreService
  ) {
    this.currentroute = this.router.url;
    if (
      this.currentroute.includes("/admin") ||
      this.currentroute.includes("/supermaster") ||
      this.currentroute.includes("/master") ||
      this.currentroute.includes("/agent") ||
      this.currentroute.includes("/superagent") ||
      this.currentroute.includes("/clients")
    ) {
      this.showActionButtons = true;
    }
  }

  agInit(params) {
    this.params = params;
    this.colDef = this.params.colDef.field;
    this.data = this.params.data;
  }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.sportBfId = this.route.snapshot.paramMap.get("sportBfId");
    this.matchBfId = this.route.snapshot.paramMap.get("bfId");
    this.title = this.route.snapshot.paramMap.get("title");
  }
  updatelimit(userdata: any) {
    // console.log(userdata)
    this.usermanagement
      .UpdateFixLimits(userdata.id, userdata.fixLimit)
      .subscribe((data) => {
        if (data.status == "Success") {
          this.notifyService.success(data.result);
          this.params.context.componentParent.valueChanged();
        } else {
          this.notifyService.error(data.result);
        }
      });
  }
  updatelimitforclients(userdata: any) {
    // console.log(userdata)
    this.limits
      .UpdateFixLimitsCl(userdata.id, userdata.fixLimit, userdata.currentLimit)
      .subscribe((data) => {
        if (data.status == "Success") {
          this.notifyService.success(data.result);
          this.params.context.componentParent.valueChanged();
        } else {
          this.notifyService.error(data.result);
        }
      });
  }

  Deleteticker(tickerdata: any) {
    this.newsticker.DeleteTicker(tickerdata.id).subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.gettickerlist();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }

  CancelFancybyId() {
    this.disabled = true;

    this.fancyService
      .CancelFancybyId(this.data.fancyCode, this.data.matchId)
      .subscribe(
        (data) => {
          if (data.status == "Success") {
            this.notifyService.success(data.result);
            this.params.context.componentParent.GetFancyList();
          } else {
            this.notifyService.error(data.result);
          }

          this.disabled = false;
        },
        (err) => {}
      );
  }

  CloseBookBulk() {
    this.disabled = true;

    this.bmService.CloseBookBulk(this.data.bookCode).subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetBookList();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SetMatchLiveTvDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.SaveLiveTvbyMatch(result);
      }
    });
  }

  SelectChangeHandler(val) {
    console.log(val);
  }

  openPackageDialog(): void {
    this.data.marketCode = "";
    this.sportService.GetMktSettingsPckgList().subscribe((data) => {
      this.MktSettingsPckgList = data.data;
      this.data["Packagelist"] = data.data;
      console.log(this.data);
      const dialogRef = this.dialog.open(UpdatePackageDialog, {
        width: "500px",
        data: this.data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result);
          this.sportService
            .UpdateMktSettingPckg(result.id, result.marketCode)
            .subscribe((data) => {
              if (data.status == "Success") {
                this.notifyService.success(data.result);
                this.params.context.componentParent.GetImportRateList();
              } else {
                this.notifyService.error(data.result);
              }
            });
        } else {
          console.log(result);
        }
      });
    });
  }

  openShowPwdDialog(): void {
    const dialogRef = this.dialog.open(ShowPwdDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  openLimitsDialog(): void {
    const dialogRef = this.dialog.open(LimitsDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result != undefined || result != null) {
          this.editUserData(result);
        }
      }
    });
  }
  openShareDialog(): void {
    const dialogRef = this.dialog.open(ShareDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result != undefined || result != null) {
          this.editUserData(result);
        }
      }
    });
  }
  openSettleDialog(): void {
    const dialogRef = this.dialog.open(SettleFancyDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.SettleFancy(result);
      }
    });
  }

  editUserData(data) {
    var editusersdata = {
      MComm: data.MComm,
      SComm: data.SComm,
      agentShare: data.maxShare,
      context: "web",
      firstName: data.name,
      fixLimit: data.fixLimit,
      expoLimit: data.expoLimit,
      fixFees: data.fixFees ? data.fixFees : 0,
      isMComm: 0,
      isSComm: 0,
      myShare: data.myShare,
      bookDisplayType: data.bookDisplayType,
      commType: 1,
      mLossingComm: data.mLossingComm,
      sLossingComm: data.sLossingComm,
      userID: data.userId,
    };
    this.usermanagement.getEditUserData(editusersdata).subscribe((resp) => {
      if (resp.status == "Success") {
        this.notifyService.success(resp.result);
        this.params.context.componentParent.GetuserList();
      } else {
        this.notifyService.error(resp.result);
      }
    });
  }

  SaveLiveTvbyMatch(result) {
    const bfmtid = result.matchBfId;
    const no = result.id;
    const ip = result.ip;
    const p = "p1";

    if (result.hdmi) {
      result.hdmi = result.hdmi.toUpperCase();
    }
    const hdmi = result.hdmi;

    this.sportService
      .SaveLiveTvbyMatch(bfmtid, no, ip, p, hdmi)
      .subscribe((data) => {
        if (data.status == "Success") {
          this.notifyService.success(data.result);
          this.params.context.componentParent.GetImportRateList();
        } else {
          this.notifyService.error(data.result);
        }
      });
  }
  SettleFancy(result) {
    let fancydata = {
      MID: result.matchId,
      FID: result.fancyCode,
      S: result.note,
    };
    this.fancyService.SettleFancy(fancydata).subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetFancyList();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }

  openDeleteBetDialog(bet): void {
    // console.log(bet)
    const dialogRef = this.dialog.open(RejectBetdialogcell, {
      width: "250px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.report
          .RejectBets(result.id, result.adminUsername)
          .subscribe((data) => {
            if (data.status == "Success") {
              this.notifyService.success(data.result);
            } else {
              this.notifyService.error(data.result);
            }
          });
      }
    });
  }

  openUpdateTossDialog(bet): void {
    this.data.matchResult = "";
    this.data.tossResult = "";
    const dialogRef = this.dialog.open(UpdateTossDialog, {
      width: "300px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        var resultstring =
          result.matchResult +
          " Won The Toss Elected To " +
          result.tossResult +
          " First";
        this.scoreinput
          .UpdateTossResult(result.matchId, resultstring)
          .subscribe((data) => {
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              this.params.context.componentParent.getscoreList();
            } else {
              this.notifyService.error(data.result);
            }
          });
      }
    });
  }
  Tossstatus(Tossstatus: any, teamname: string) {
    throw new Error("Method not implemented.");
  }

  openUpdateResultDialog(bet): void {
    this.data.matchResult = "";
    this.data.tossResult = "";
    const dialogRef = this.dialog.open(UpdateResultDialog, {
      width: "300px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        var resultstring = result.matchResult + " Won By " + result.tossResult;
        this.scoreinput
          .UpdateMatchResult(result.matchId, resultstring)
          .subscribe((data) => {
            if (data.status == "Success") {
              this.notifyService.success(data.result);
              this.params.context.componentParent.getscoreList();
            } else {
              this.notifyService.error(data.result);
            }
          });
      }
    });
  }
}

@Component({
  template: `<h1 mat-dialog-title>{{ data.userName }}</h1>
    <hr />
    <div mat-dialog-content>
      <div class="form-group">
        <label class="col-sm-12 control-label">My Share</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="myshare"
            [(ngModel)]="data.myShare"
            placeholder="Enter My Share"
            type="number"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-12 control-label">Agent Share</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="agentshare"
            [(ngModel)]="data.maxShare"
            placeholder="Enter Max Agent Share"
            type="number"
          />
        </div>
      </div>
    </div>
    <hr />
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data"
        cdkFocusInitial
        [disabled]="!data.maxShare"
      >
        Ok
      </button>
    </div>`,
})
export class ShareDialog {
  constructor(
    public dialogRef: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  template: `<h1 mat-dialog-title>{{ data.userName }}'s Commission Settings</h1>
    <hr />
    <div mat-dialog-content>
      <div class="form-group">
        <label class="col-sm-12 control-label">Market Commission</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="MComm"
            [(ngModel)]="data.MComm"
            placeholder="Enter Market Commission"
            type="number"
          />
        </div>
      </div>
      <div class="form-group" *ngIf="data.userType == 6">
        <label class="col-sm-12 control-label">Exposure Limit</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="expoLimit"
            [(ngModel)]="data.expoLimit"
            placeholder="Enter Exposure Limit"
            type="number"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-12 control-label">Session Commission</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="Scomm"
            [(ngModel)]="data.SComm"
            placeholder="Enter Session Commission"
            type="number"
          />
        </div>
      </div>
    </div>
    <hr />
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data"
        cdkFocusInitial
        [disabled]="!data.SComm"
      >
        Ok
      </button>
    </div>`,
})
export class LimitsDialog {
  constructor(
    public dialogRef: MatDialogRef<LimitsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  template: `<h1 mat-dialog-title>{{ data.userName }}'s Password</h1>
    <hr />
    <div mat-dialog-content>
      <div class="form-group">
        <div class="col-sm-12">
          <input
            class="form-control"
            name="Password"
            [(ngModel)]="data.password"
            type="text"
            [disabled]="true"
          />
        </div>
      </div>
    </div>

    <hr />
    <div mat-dialog-actions>
      <button mat-raised-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="data"
        cdkFocusInitial
        [disabled]="!data"
      >
        Ok
      </button>
    </div>`,
})
export class ShowPwdDialog {
  constructor(
    public dialogRef: MatDialogRef<ShowPwdDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "set-match-live-tv-dialog",
  templateUrl: "set-match-live-tv-dialog.html",
})
export class SetMatchLiveTvDialog {
  constructor(
    public dialogRef: MatDialogRef<SetMatchLiveTvDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "package-dialog",
  templateUrl: "package-dialog.html",
})
export class UpdatePackageDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdatePackageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "settle-fancy-dialog",
  templateUrl: "settle-fancy-dialog.html",
})
export class SettleFancyDialog {
  constructor(
    public dialogRef: MatDialogRef<SettleFancyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "rejectbetdialog",
  templateUrl: "reject-bet-dialog-cell.html",
})
export class RejectBetdialogcell {
  params: any;
  constructor(
    public dialogRef: MatDialogRef<RejectBetdialogcell>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "update-toss-dialog",
  templateUrl: "update-toss-dialog.html",
})
export class UpdateTossDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateTossDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "update-result-dialog",
  templateUrl: "update-result-dialog.html",
})
export class UpdateResultDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
