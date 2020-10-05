import { Component,OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { Router } from '@angular/router';
import { FancyService } from '../services/fancy.service';
import { BookmakingService } from '../services/bookmaking.service';

@Component({
  selector: 'app-settingfancybookcell',
  templateUrl: './settingfancybookcell.component.html',
  styleUrls: ['./settingfancybookcell.component.css']
})
export class SettingfancybookcellComponent implements OnInit {
  params: any;
  data: any;

  constructor(
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private  usermanagement:UsermanagementService,
    private router: Router,
    private fancyservice:FancyService,
    private bmService: BookmakingService
    ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FancyBooksettingDialog, {
      width: '450px',
      data:this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if(result!=undefined){
        if(result.fancyCode){
          var fancydata={
            "betDelay":result.betDelay,
            "fancyId":result.fancyCode,
            "maxStake":result.maxStake,
            "maxStakePerRate":result.maxStakePerRate,
            "minStake":result.minStake,
            "rateDiff":result.rateDifference,
            "rateRange":result.rateRange
          }
          this.fancyservice.UpdFancySettings(fancydata).subscribe(resp=>{
            if (resp.status == "Success") {
              this.notifyService.success(resp.result);
            }else{
              this.notifyService.error(resp.result);
            }
          })
        }else{
          var bookdata={
            "bookId":result.bookCode,
            "maxRate":result.maxRate,
            "maxStake":result.maxStake,
            "maxStakePerRate":result.maxStakePerRate,
            "minRate":result.minRate,
            "minStake":result.minStake,
            "rateDifference":result.rateDifference
          };
          this.bmService.EditBookSettings(bookdata).subscribe(resp=>{
            if (resp.status == "Success") {
              this.notifyService.success(resp.result);
            }else{
              this.notifyService.error(resp.result);
            }
          })
        }
      }
    });
  }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
  }
}

@Component({
  selector: 'booksetting',
  templateUrl: '../Dialogbox/booksetting.html',
})
export class FancyBooksettingDialog {
  params: any;

  constructor(
    public dialogRef: MatDialogRef<FancyBooksettingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
  }

}
