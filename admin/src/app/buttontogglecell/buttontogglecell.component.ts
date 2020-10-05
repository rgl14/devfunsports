import { Component, OnInit,Inject } from '@angular/core';
import { FancyService } from '../services/fancy.service';
import { NotificationService } from '../shared/notification.service';
import { BookmakingService } from '../services/bookmaking.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { SportDataService } from '../services/sport-data.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-buttontogglecell',
  templateUrl: './buttontogglecell.component.html',
  styleUrls: ['./buttontogglecell.component.css']
})
export class ButtontogglecellComponent implements OnInit {
  isActive: boolean;
  disabled: boolean;
  data: any;

  params: any;
  isAll: any;
  currentroute: any;
  userId: string;
  showUpdateToggle: boolean;
  showOpenDialogToggle: boolean;

  constructor(
    private fancyService: FancyService,
    private notifyService: NotificationService,
    private bmService: BookmakingService,
    private  usermanagement:UsermanagementService,
    private sportService: SportDataService,
    public dialog: MatDialog,
    private router: Router,
    private newsticker:TickerService,
    private route:ActivatedRoute,
  ) {
    this.currentroute = this.router.url;
    
    if (this.currentroute.includes('/newsticker') || this.currentroute.includes('/importrate') || this.currentroute.includes('/fancy') || this.currentroute.includes('/bookmaker')) {
      this.showUpdateToggle = true;
    }
    if (this.currentroute.includes('/admin') || this.currentroute.includes('/supermaster') || this.currentroute.includes('/master') || this.currentroute.includes('/superagent') || this.currentroute.includes('/agent') || this.currentroute.includes('/clients') || this.currentroute.includes('/blockedclient')) {
      this.showOpenDialogToggle = true;
    }
   }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
    // console.log(this.data);

    if (this.params.colDef.field == "isActive") {
      if (this.data.isActive == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
    if (this.params.colDef.field == "isBetAllow") {
      if (this.data.isBetAllow == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
    if (this.params.colDef.field == "betStatus") {
      if (this.data.betStatus == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
    if (this.params.colDef.field == "accStatus") {
      if (this.data.accStatus == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }

    if (this.params.colDef.field == "active") {
      if (this.data.active == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
    if (this.params.colDef.field == "betAllow") {
      if (this.data.betAllow == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }

  }

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserstatusDialog, {
      width: '250px',
      data:this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result==undefined){
        this.params.context.componentParent.GetuserList();
      }else{
        var isAll=result.statusSelected
        this.update(isAll);  
      }
    });
  }

  update(isall:any) {

    if (this.data.fancyCode) {
      if (this.params.colDef.field == "isActive") {
        this.UpdateFancyStatus();
      }

      if (this.params.colDef.field == "isBetAllow") {
        this.UpdateFancyBetStatus();
      }
    }
    else if (this.data.marketInfo) {
      if (this.params.colDef.field == "active") {
        this.UpdateMktStatus();
      }

      if (this.params.colDef.field == "betAllow") {
        this.UpdateMktBetStatus();
      }
    }
    else if (this.data.bookCode) {
      if (this.params.colDef.field == "isActive") {
        this.EditBookStatus();
      }

      if (this.params.colDef.field == "isBetAllow") {
        this.EditBookBetStatus();
      }
    }
    else if (this.data.userId) {
      if (this.params.colDef.field == "accStatus") {
        this.UpdateUserStatus(isall);
      }

      if (this.params.colDef.field == "betStatus") {
        this.UpdateBetStatus(isall);
      }
    }
    else if (this.data.isPermanent) {
      if (this.params.colDef.field == "isActive") {
        this.Updatetickerstatus();
      }
    }


  }

  //usermanagement
  UpdateUserStatus(Isall){
    if (this.isActive) {
      this.data.accStatus = 0;
    }
    else {
      this.data.accStatus = 1;
    }
    this.usermanagement.getUserStatusUpdate(this.data.userId,this.data.accStatus,Isall).subscribe(data=>{
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.params.context.componentParent.GetuserList();
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

  Updatetickerstatus(){
    if (this.isActive) {
      this.data.isActive = 0;
    }
    else {
      this.data.isActive = 1;
    }
    this.newsticker.UpdTickerStatus(this.data.id,this.data.isActive).subscribe(data=>{
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

  UpdateBetStatus(Isall){
    if (this.isActive) {
      this.data.betStatus = 0;
    }
    else {
      this.data.betStatus = 1;
    }
    this.usermanagement.getUpdateBetStatus(this.data.userId,this.data.betStatus,Isall).subscribe(data=>{
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.params.context.componentParent.GetuserList();
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

  //fancy Management
  UpdateFancyStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isActive = 0;
    }
    else {
      this.data.isActive = 1;
    }
    this.fancyService.UpdateFancyStatus(this.data.fancyCode, this.data.isActive).subscribe(data => {

      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;

    }, err => {

    })
  }

  UpdateFancyBetStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isBetAllow = 0;
    }
    else {
      this.data.isBetAllow = 1;
    }
    this.fancyService.UpdateFancyBetStatus(this.data.fancyCode, this.data.isBetAllow).subscribe(data => {

      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;

    })
  }

  //Bookmaker
  EditBookStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isActive = 0;
    }
    else {
      this.data.isActive = 1;
    }

    this.bmService.EditStatus(this.data.bookCode, this.data.isActive).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }

  EditBookBetStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isBetAllow = 0;
    }
    else {
      this.data.isBetAllow = 1;
    }
    this.bmService.EditBetStatus(this.data.bookCode, this.data.isBetAllow).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }

  //market status
  UpdateMktStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.active = 0;
    }
    else {
      this.data.active = 1;
    }

    this.sportService.UpdateMktStatus(this.data.id, this.data.active).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.params.context.componentParent.GetImportRateList();
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }

  UpdateMktBetStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.betAllow = 0;
    }
    else {
      this.data.betAllow = 1;
    }
    this.sportService.UpdateMktBetStatus(this.data.id, this.data.betAllow).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.params.context.componentParent.GetImportRateList();
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }


}

@Component({
  selector: 'userstatus',
  templateUrl: '../Dialogbox/userstatusupdate.html',
})
export class UserstatusDialog {
  params: any;

  constructor(
    public dialogRef: MatDialogRef<UserstatusDialog>,
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

