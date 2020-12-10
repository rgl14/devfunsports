import { Component, OnInit, Input } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { ReportsService } from 'src/app/services/reports.service';
import { FancybookDialog } from "./fancybook.component";

@Component({
  template: `
    <a
      (click)="openfancybookDialog(data)"
    >{{data.clUsername}}</a>

  `,
})
export class fancyname implements OnInit {
  data: any;
  constructor(private dialog: MatDialog,private report: ReportsService) {}

  agInit(params) {
    this.data = params.data;
    // console.log(this.data)
  }

  

  openfancybookDialog(bet): void {
    console.log(bet);
    this.report.Fancybook(bet.matchId,bet.fancyId,bet.clUserid).subscribe(resp=>{

        var bookdata={
            betresp:bet,
            apiresp:this.combinedFancyBook(resp.data)
        }
        const dialogRef = this.dialog.open(FancybookDialog, {
            width: "300px",
            data: bookdata,
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            console.log(result);
          });
    })
  }

    combinedFancyBook(data) {
    var parentFancyData = [];
    var middleData = [];
    var matchValue = "";
    var lastKeyValue = "";
    var fistKeyValue;
    var i = 0;
    $.each(data, function (key, value) {
      if (key == 0) {
        matchValue = value.Value;
      }
      if (matchValue != value.Value) {
        parentFancyData.push({
          Key: value.Key - 1,
          Value: matchValue,
        });
        fistKeyValue = value.Key;
      }
      matchValue = value.Value;
      lastKeyValue = value.Key;
    });
    parentFancyData.push({
      Key: fistKeyValue,
      Value: matchValue,
    });

    parentFancyData.forEach((item, index) => {
      if (index > 0) {
        $.each(data, function (key, value) {
          if (
            item.Key > value.Key &&
            parentFancyData[index - 1].Key < value.Key
          ) {
            parentFancyData.push({
              Key: value.Key,
              Value: value.Value,
            });
          }
        });
      }
    });
    console.log(parentFancyData, middleData);
    return parentFancyData;
  };
  ngOnInit() {}
}