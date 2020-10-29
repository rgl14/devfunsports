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
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedataService } from "../services/sharedata.service";

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
    console.log(this.data)
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
  openSettlementDialog(): void {
    const dialogRef = this.dialog.open(PartialPaymentDialog, {
      width: "350px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result != undefined) {
        this.params.context.componentParent.GetuserList();
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
  selector: "partial-payment",
  template: `<h1 mat-dialog-title align="center">Cash Settlement of {{data.userName}}</h1>
  <hr />
    <div mat-dialog-content>
    <div class="form-group" [formGroup]="form">
    <div class="col-sm-12">

    <div class="form-group">
      <input
        class="form-control"
        onkeypress="return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57"
        name="amount"
        placeholder="Enter Amount"
        type="number"
        formControlName="amount"
        max="100"
        min="0"
      />
      </div>
    </div>
    <div class="col-md-12">
    <div class="form-group">
      <textarea
        id="txt_boxe"
        rows="6"
        class="form-control border-primary"
        type="text"
      >Cash Settlement of {{data.userName }} :</textarea>
    </div>
    </div>
  </div>
    </div>
    <div mat-dialog-actions align="center">
      <button mat-raised-button color="warn" (click)="onNoClick()">
        Cancel
      </button>
      <button
        mat-raised-button
        color="primary"
        cdkFocusInitial
        (click)="updateSettle(data.userType)"
        [disabled]="!form.valid || disabled"
      >
        Settle
      </button>
    </div>`,
})
export class PartialPaymentDialog {
  params: any;
  form:FormGroup;
  accountInfo;
  disabled:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<PartialPaymentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private limits:LimitsService,
    private formbuilder:FormBuilder,
    private usermanagement:UsermanagementService,
    private notifyService:NotificationService
  ) {
    this.form = this.formbuilder.group({
      amount: [0, Validators.required],
    });
    this.usermanagement.getAccountInfo().subscribe((data) => {
      this.accountInfo = data.data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateSettle(userType){
    if((this.accountInfo.userType==3 || this.accountInfo.userType==4 || this.accountInfo.userType==5) && userType==6){
      var data=  {
        amount:this.form.get("amount").value,
        receiverUn:(this.data.chips<0)?this.accountInfo.userName : this.data.uname,
        remarks:(this.data.chips<0)? "Cash Withdraw From "+this.accountInfo.userName+" To "+this.data.userName : "Cash Deposit From "+this.accountInfo.userName+" To "+this.data.userName,
        senderUn:(this.data.chips<0)? this.data.userName : this.accountInfo.userName,
      }
    } else {
      var data=  {
        amount:this.form.get("amount").value,
        "receiverUn":(this.data.chips<0)?this.data.userName:this.accountInfo.userName,
        "remarks":(this.data.chips<0)? this.accountInfo.userName+" Paid Cash To "+this.data.userName : this.accountInfo.userName+" Recieved Cash From "+this.data.userName,
        "senderUn":(this.data.chips<0)?this.accountInfo.userName:this.data.userName,
      }
  }
    
    this.disabled=true;
    if(this.accountInfo.userType==1 && this.data.userType==2){
      this.limits.SettleCompanyDoubleSuperCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==1 && this.data.userType==3){
      this.limits.SettleCompanySuperMasterCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==1 && this.data.userType==4){
      this.limits.SettleCompanyMasterCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==1 && this.data.userType==5){
      this.limits.SettleCompanyAgentCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==2 && this.data.userType==3){
      this.limits.SettleDoubleSupSuperMasterCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==2 && this.data.userType==4){
      this.limits.SettleDoubleSuperMasterCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==2 && this.data.userType==5){
      this.limits.SettleDoubleSuperAgentCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==3 && this.data.userType==4){
      this.limits.SettleSuperMasterMasterCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==3 && this.data.userType==5){
      this.limits.SettleSuperMasterAgentCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==3 && this.data.userType==5){
      this.limits.SettleSuperMasterClientCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==4 && this.data.userType==5){
      this.limits.SettleMasterAgentCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==4 && this.data.userType==6){
      this.limits.SettleMasterClientCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    } else if (this.accountInfo.userType==5 && this.data.userType==6){
      this.limits.SettleAgentClientCash(data).subscribe(res=>{
        if (res.status == "Success") {
          this.notifyService.success(res.result);
          this.dialogRef.close(res);
          this.disabled=false;
        } else {
          this.notifyService.error(res.result);
          this.disabled=false;
        }
      })
    }

  }
}

@Component({
  template: `<h1 mat-dialog-title align="center">{{ data.userName }}</h1>
    <hr />
    <div mat-dialog-content [formGroup]="form">
      <div class="form-group">
        <label class="col-sm-12 control-label">My Share</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="myshare"
            formControlName="myShare"
            placeholder="Enter My Share"
            type="number"
            max="100"
            min="0"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-12 control-label">Downline Share</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="agentshare"
            formControlName="CompanyShare"
            max="100"
            min="0"
            placeholder="Enter Downline Share"
            type="number"
          />
        </div>
      </div>
    </div>
    <hr />
    <div mat-dialog-actions align="center">
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
  form: FormGroup;
  accountInfo = null;
  constructor(
    public dialogRef: MatDialogRef<ShareDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    private usermanagement: UsermanagementService
  ) {
    this.form = this.formbuilder.group({
      CompanyShare: [
        { value: this.data.maxShare, disabled: true },
        Validators.required,
      ],
      myShare: [this.data.myShare, Validators.required],
    });
    this.usermanagement.getAccountInfo().subscribe((data) => {
      this.accountInfo = data.data;
    });
    this.formControlsmysharechanged();
  }

  formControlsmysharechanged() {
    this.form.get("myShare").valueChanges.subscribe((mode: any) => {
      if (mode > this.accountInfo.maxMyShare) {
        this.form.controls["myShare"].setValue(this.accountInfo.maxMyShare);
        this.data.myShare = this.accountInfo.maxMyShare;
      } else {
        this.data.myShare = mode;
        let myshare = this.accountInfo.maxMyShare - mode;
        this.form.controls["CompanyShare"].setValue(myshare);
        this.data.maxShare = myshare;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  template: `<h1 mat-dialog-title align="center">
      {{ data.userName }}'s Commission Settings
    </h1>
    <hr />
    <div mat-dialog-content [formGroup]="form">
      <div class="form-group">
        <label class="col-sm-12 control-label">Market Commission</label>
        <div class="col-sm-12">
          <input
            class="form-control"
            onkeypress="return event.charCode >= 48"
            name="MComm"
            formControlName="MComm"
            placeholder="Enter Market Commission"
            type="number"
            max="100"
            min="0"
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
            formControlName="expoLimit"
            placeholder="Enter Exposure Limit"
            type="number"
            max="100"
            min="0"
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
            formControlName="SComm"
            placeholder="Enter Session Commission"
            type="number"
          />
        </div>
      </div>
    </div>
    <hr />
    <div mat-dialog-actions align="center">
      <button mat-raised-button (click)="onNoClick()">Cancel</button>
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
export class LimitsDialog {
  form: FormGroup;
  accountInfo = null;
  iscommissionedit: boolean;
  constructor(
    public dialogRef: MatDialogRef<LimitsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    private usermanagement: UsermanagementService,
    private sharedata: SharedataService
  ) {
    this.form = this.formbuilder.group({
      MComm: [this.data.MComm, Validators.required],
      SComm: [this.data.SComm, Validators.required],
      expoLimit: [this.data.expoLimit, Validators.required],
    });
    this.usermanagement.getAccountInfo().subscribe((data) => {
      this.accountInfo = data.data;
    });

    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        if (data.userType != 1) {
          this.iscommissionedit = true;
          this.form.get("expoLimit").clearValidators();
          this.form.get("MComm").clearValidators();
        } else {
          this.iscommissionedit = false;
        }
      }
    });
    this.formControlmcommchanged();
    this.formControlscommchanged();
    this.formControlexpoLimitchanged();
  }

  formControlexpoLimitchanged() {
    this.form.get("expoLimit").valueChanges.subscribe((mode: any) => {
      this.data.expoLimit = mode;
    });
  }

  formControlmcommchanged() {
    this.form.get("MComm").valueChanges.subscribe((mode: any) => {
      if (mode > this.accountInfo.matchComm) {
        this.form.controls["MComm"].setValue(this.accountInfo.matchComm);
        this.data.MComm = this.accountInfo.matchComm;
      } else {
        if (mode > 100) {
          this.data.MComm = 100;
          this.form.controls["MComm"].setValue(100);
        }
      }
    });
  }
  formControlscommchanged() {
    this.form.get("SComm").valueChanges.subscribe((mode: any) => {
      if (mode > this.accountInfo.sessionComm) {
        this.data.SComm = this.accountInfo.sessionComm;
        this.form.controls["SComm"].setValue(this.accountInfo.sessionComm);
      } else {
        if (mode > 100) {
          this.data.SComm = 100;
          this.form.controls["SComm"].setValue(100);
        }
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  template: `<h1 mat-dialog-title align="center">
      {{ data.userName }}'s Password
    </h1>
    <hr />
    <div mat-dialog-content>
      <div class="form-group">
        <div class="col-sm-12">
          <input
            class="form-control"
            name="Password"
            [(ngModel)]="password"
            type="text"
            [disabled]="true"
          />
        </div>
      </div>
    </div>

    <hr />
    <div mat-dialog-actions align="center">
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
  password;
  constructor(
    public dialogRef: MatDialogRef<ShowPwdDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usermanagement:UsermanagementService
  ) {
    // console.log(data);
    this.getpassword()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getpassword(){
   this.usermanagement.getShowpassword(this.data.userId).subscribe(res=>{
     console.log(res);
     if(res.description.result=="Data found"){
      this.password=res.pwd
     }
   })
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
