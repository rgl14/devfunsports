import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { ReportsService } from 'src/app/services/reports.service';
import { Mobookdialog } from "./mobook.component";

@Component({
  template: `
    <a style="color:red,"
      (click)="openDeleteBetDialog(data)"
    >{{data.clUsername}}</a>
  `,
})
export class name implements OnInit {
  data: any;
  constructor(private dialog: MatDialog,private report: ReportsService) {}

  agInit(params) {
    this.data = params.data;
    console.log(this.data)
  }

  

  openDeleteBetDialog(bet): void {
    console.log(bet);
    this.report.ExposureBook(bet.marketId,bet.clUserid).subscribe(resp=>{
        console.log(resp)
        var bookdata={
            betresp:bet,
            apiresp:resp.data
        }
        const dialogRef = this.dialog.open(Mobookdialog, {
            width: "300px",
            data: bookdata,
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
          });
    })
  }
  ngOnInit() {}
}
