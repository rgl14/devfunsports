import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookmakingService } from '../services/bookmaking.service';
import { NotificationService } from '../shared/notification.service';
import { FancyService } from '../services/fancy.service';

@Component({
  selector: 'app-navigationcell',
  templateUrl: './navigationcell.component.html',
  styleUrls: ['./navigationcell.component.css']
})
export class NavigationcellComponent implements OnInit {
  data: any;
  currentroute: string;
  automatic: string;
  runner: any = "";
  params: any;
  constructor(
    private router: Router,
    private bmService: BookmakingService,
    private notifyService: NotificationService,
    private fancy:FancyService
    ) {

    this.currentroute = this.router.url;
    
  }

  agInit(params: any) {
    // console.log(params);
    this.params=params;
    this.data = params.data;
    // console.log(this.data);
    if (this.currentroute == "/fancy") {
      this.automatic = this.data.automatic.toString();
    }
  }

  ngOnInit() {
  }

  getvalue(params:any){
    if(this.runner=='' || this.runner==null){
      this.notifyService.warning("Please Select Runner Name");
      return false;
    }
    var data={
      BOOKID:params.bookCode,
      MTID:params.matchId,
      WINNER:this.runner,
      TYPE:params.bookType
    }
    this.bmService.SettleBook(data).subscribe(data=>{
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetBookList();
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

  toggleMethod(value){
    var fid=this.data.fancyCode;
    // console.log(fid)
    this.fancy.UpdateFRateMode(fid,value).subscribe(data=>{
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetFancyList();
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

}
