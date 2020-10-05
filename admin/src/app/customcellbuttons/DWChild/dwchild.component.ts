import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  templateUrl: "./dwchild.component.html",
})
export class dWcomponent implements OnInit {
  params;
  colDef;
  data;
  showActionButtons: boolean = false;
  currentroute;
  constructor(private router: Router, private dialog: MatDialog) {
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
  ngOnInit() {}

  openDPDialog(): void {
    const dialogRef = this.dialog.open(dpDialog, {
      width: "500px",
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
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
      }
    });
  }
}

@Component({
  template: ` <h1 mat-dialog-title style="text-align: center;">
      {{ data.userName }}
    </h1>
    <div mat-dialog-content style="overflow: hidden;">
      <form [formGroup]="systemPointForm">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Current Chips</label>
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
          <div class="col-md-12">
            <div class="form-group">
              <label>Comment</label>
              <textarea
                id="txt_box"
                rows="6"
                class="form-control border-primary"
                type="text"
                placeholder="Comment"
                formControlName="Comments"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
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
  constructor(
    public dialogRef: MatDialogRef<wdDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log(data);
    this.systemPointForm = this.fb.group({
      Amount: ["", Validators.required],
      Comments: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  template: `
    <h1 mat-dialog-title style="text-align: center;">{{ data.userName }}</h1>
    <div mat-dialog-content style="overflow: hidden;">
      <form [formGroup]="systemPointForm">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Current Chips</label>
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
          <div class="col-md-12">
            <div class="form-group">
              <label>Comment</label>
              <textarea
                id="txt_box"
                rows="6"
                class="form-control border-primary"
                type="text"
                placeholder="Comment"
                formControlName="Comments"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
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
  constructor(
    public dialogRef: MatDialogRef<dpDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    console.log(data);
    this.systemPointForm = this.fb.group({
      Amount: ["", Validators.required],
      Comments: ["", Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
