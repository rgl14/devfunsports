import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "fancybookdialog",
  template: `<h1 mat-dialog-title>{{data.betresp.runnerName}} - {{ data.betresp.clUsername }}</h1>
    <mat-divider></mat-divider>
    <div mat-dialog-content>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>RUNS</th>
            <th>POSITION</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="data.apiresp.length != 0">
            <tr *ngFor="let fbook of data.apiresp | sort: 'Key'">
              <td>{{ fbook.Key }}</td>
              <td [ngClass]="fbook.Value >= 0 ? 'text-success' : 'text-danger'">
                {{ fbook.Value | number: "1.2-2" }}
              </td>
            </tr>
          </ng-container>
          <ng-container *ngIf="data.apiresp.length == 0">
            <tr>
              <td colspan="2" style="text-align: center;">
                <b>No Book Available...</b>
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>

    <div mat-dialog-actions>
      <button mat-raised-button color="warn" (click)="onNoClick()">
        Close
      </button>
    </div>`,
})

export class FancybookDialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<FancybookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit() {}
}
