import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { NotificationService } from "src/app/shared/notification.service";
import { ReportsService } from "src/app/services/reports.service";

@Component({
  selector: "rejectbetdialog",
  template: `<h1 mat-dialog-title>Reject Bet</h1>
    <div mat-dialog-content>
      <div class="form-group block_3" *ngIf="data.id">
        <label>Bet Id</label>
        <input type="input" class="form-control" [(ngModel)]="data.id" />
      </div>
      <div class="form-group block_3">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          [(ngModel)]="data.password"
        />
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
        (click)="RejectBets(data)"
      >
        Reject
      </button>
    </div>`,
})
export class RejectBetdialog {
  params: any;
  constructor(
    private notifyService: NotificationService,
    private report: ReportsService,
    public dialogRef: MatDialogRef<RejectBetdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  RejectBets(data) {
    // console.log(data, "rejectBet");
    data.password = "1" + data.password + "9";
    if (data.id) {
      this.report.RejectBets(data.id, data.password).subscribe((data) => {
        if (data.status == "Success") {
          this.notifyService.success(data.result);
        } else {
          this.notifyService.error(data.result);
        }
      });
    } else {
      let ids = [];
      data.forEach((item, index) => {
        ids.push(item.id);
      });
      //   console.log(ids.toString());
      this.report
        .RejectBetsMulti(ids.toString(), data[0].matchId, data.password)
        .subscribe((data) => {
          if (data.status == "Success") {
            this.notifyService.success(data.result);
          } else {
            this.notifyService.error(data.result);
          }
        });
    }
  }
}
