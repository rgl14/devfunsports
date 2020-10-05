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
