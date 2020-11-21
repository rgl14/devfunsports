import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: "mobookdialog",
    template: `<h1 mat-dialog-title>MatchOdds Book -  {{data.betresp.clUsername}}</h1>
      <div mat-dialog-content>
        <div class="form-group block_3">
        <table class="table table-bordered">
        <thead>
          <tr>
            <th>Runner</th>
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
        </tbody>
      </table>
        </div>
      </div>
      <div mat-dialog-actions>
        <button mat-raised-button color="warn" (click)="onNoClick()">
          Close
        </button>
      </div>`,
})
export class Mobookdialog implements OnInit {
  constructor(public dialogRef: MatDialogRef<Mobookdialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

  ngOnInit() {}
}
