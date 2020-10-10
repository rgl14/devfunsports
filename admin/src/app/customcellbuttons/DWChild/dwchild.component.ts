import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedataService } from "src/app/services/sharedata.service";
import { UsermanagementService } from 'src/app/services/usermanagement.service';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  templateUrl: "./dwchild.component.html",
})
export class dWcomponent implements OnInit {
  params;
  colDef;
  data;
  showActionButtons: boolean = false;
  currentroute;
  accountInfo = null;
  constructor(private router: Router, private dialog: MatDialog,private usermanage:UsermanagementService,private notifyService:NotificationService,  private sharedata: SharedataService) {
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

    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        this.accountInfo = data;
      }
    });
  }

  agInit(params) {
    this.params = params;
    this.colDef = this.params.colDef.field;
    this.data = this.params.data;
  }
  ngOnInit() {}

  openDPDialog(): void {
    const dialogRef = this.dialog.open(dpDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       var data=  {
          amount:result.chips,
          "context":"Web",
          "transferBy":this.accountInfo.userName,
          "transferByRemarks":"String content",
          "transferTo":result.userName,
          "transfertoRemarks":"String content",
          "type":1
        }
        this.transferFunds(data)
      }
    });
  }
  openDWDialog(): void {
    const dialogRef = this.dialog.open(wdDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        var data=  {
          "amount":1.26743233E+15,
          "context":"String content",
          "transferBy":"String content",
          "transferByRemarks":"String content",
          "transferTo":"String content",
          "transfertoRemarks":"String content",
          "type":1
        }
        this.transferFunds(data)
      }
    });
  }

  transferFunds(data){
    this.usermanage.TransferChips(data).subscribe((data) => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetuserList();
      } else {
        this.notifyService.error(data.result);
      }
    });
  }
}

@Component({
  template: ` <h1 mat-dialog-title style="text-align: center;">
      {{ data.userName }}
    </h1>
    <hr />
    <div mat-dialog-content style="overflow: hidden;">
      <div [formGroup]="systemPointForm">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Withdraw Chips</label>
              <input
                type="number"
                onkeypress="return event.charCode >= 48"
                class="form-control border-primary"
                placeholder="Chips"
                formControlName="Amount"
                min="0"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" style="display: contents;">
          <div class="col-md-6">
            <div class="form-group">
            <label>{{ accountInfo.userName }} Chips</label>
              <input
                type="number"
                class="form-control border-primary"
                placeholder="Chips"
                [value]="accountInfo.remainingLimit"
                [disabled]="true"
                min="0"
              />
            </div>
            </div>
            <div class="col-md-6">
            <div class="form-group">
            <label>{{ data.userName }} Chips</label>
              <input
                type="number"
                class="form-control border-primary"
                placeholder="Chips"
                [value]="data.chips"
                [disabled]="true"
                min="0"
              />
            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12" style="display: contents;">
           <div class="col-md-6">
            <div class="form-group">
              <textarea
                id="txt_box"
                rows="6"
                class="form-control border-primary"
                type="text"
              >Withdraw chips from {{ data.userName }} Rs:</textarea>
            </div>
            </div>
            <div class="col-md-6">
            <div class="form-group">
              <textarea
                id="txt_box"
                rows="6"
                class="form-control border-primary"
                type="text"
              >Withdraw chips by {{ accountInfo.userName }}</textarea>
            </div>
            </div>
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
        [disabled]="!systemPointForm.valid"
      >
        Update
      </button>
    </div>`,
})
export class wdDialog {
  systemPointForm: FormGroup;
  accountInfo = null;
  constructor(
    public dialogRef: MatDialogRef<wdDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sharedata: SharedataService
  ) {
    console.log(data);
    this.systemPointForm = this.fb.group({
      Amount: ["", Validators.required],
      Comments: ["", Validators.required],
    });

    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        this.accountInfo = data;
      }
    });
    this.formControlchanged();
  }

  formControlchanged() {
    this.systemPointForm.get("Amount").valueChanges.subscribe((mode: any) => {
      if (mode > this.accountInfo.remainingLimit) {
        this.systemPointForm.controls["Amount"].setValue(this.accountInfo.remainingLimit);
        // this.data.myShare = this.accountInfo.remainingLimit;
      } else {
        this.data.chips = mode;
        let chips = this.accountInfo.remainingLimit - mode;
        // this.systemPointForm.controls["Amount"].setValue(chips);
        // this.data.maxShare = myshare;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  template: `
  <h1 mat-dialog-title style="text-align: center;">
  {{ data.userName }}
</h1>
<hr />
<div mat-dialog-content style="overflow: hidden;">
  <form [formGroup]="systemPointForm">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label>Deposit Chips</label>
          <input
            type="number"
            onkeypress="return event.charCode >= 48"
            class="form-control border-primary"
            placeholder="Chips"
            formControlName="Amount"
            min="0"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="display: contents;">
      <div class="col-md-6">
        <div class="form-group">
        <label>{{ accountInfo.userName }} Chips</label>
          <input
            type="number"
            class="form-control border-primary"
            placeholder="Chips"
            [value]="data.chips"
            [disabled]="true"
            min="0"
          />
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group">
        <label>{{ data.userName }} Chips</label>
          <input
            type="number"
            class="form-control border-primary"
            placeholder="Chips"
            [value]="data.chips"
            [disabled]="true"
            min="0"
          />
        </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="display: contents;">
       <div class="col-md-6">
        <div class="form-group">
          <textarea
            id="txt_box"
            rows="6"
            class="form-control border-primary"
            type="text"
          >Deposit chips to {{ data.userName }} Rs:</textarea>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group">
          <textarea
            id="txt_box"
            rows="6"
            class="form-control border-primary"
            type="text"
          >Deposit chips by {{ accountInfo.userName }}</textarea>
        </div>
        </div>
      </div>
    </div>
  </form>
</div>
<div mat-dialog-actions align="center">
  <button mat-raised-button color="warn" (click)="onNoClick()">
    Cancel
  </button>
  <button
    mat-raised-button
    color="primary"
    [disabled]="!systemPointForm.valid"
  >
    Update
  </button>
</div>
  `,
})
export class dpDialog {
  systemPointForm: FormGroup;
  accountInfo = null;
  constructor(
    public dialogRef: MatDialogRef<dpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private sharedata: SharedataService
  ) {
    console.log(data);
    this.systemPointForm = this.fb.group({
      Amount: ["", Validators.required],
      Comments: ["", Validators.required],
    });
    this.sharedata.AccountInfoSource.subscribe((data) => {
      if (data != null) {
        this.accountInfo = data;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
