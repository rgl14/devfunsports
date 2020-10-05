import { Component, OnInit, Input } from "@angular/core";

import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { RejectBetdialog } from "./rejectbet.componet";

@Component({
  template: `
    <i
      class="fa fa-trash"
      aria-hidden="true"
      style="color:red;"
      (click)="openDeleteBetDialog(data)"
    ></i>
  `,
})
export class child implements OnInit {
  data: any;
  constructor(private dialog: MatDialog) {}

  agInit(params) {
    this.data = params.data;
  }

  openDeleteBetDialog(bet): void {
    console.log(bet);
    const dialogRef = this.dialog.open(RejectBetdialog, {
      width: "250px",
      data: bet,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit() {}
}
