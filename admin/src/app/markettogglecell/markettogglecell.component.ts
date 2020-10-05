import { Component, OnInit } from '@angular/core';
import { SportDataService } from '../services/sport-data.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-markettogglecell',
  templateUrl: './markettogglecell.component.html',
  styleUrls: ['./markettogglecell.component.css']
})
export class MarkettogglecellComponent implements OnInit {
  params: any;
  data: any;
  isActive: boolean;
  constructor(private sportService: SportDataService,private notifyService: NotificationService) { }

  ngOnInit() {
  }

  agInit(params) {
    console.log(params);
    this.params = params;
    this.data = this.params.data;
    if (this.params.colDef.field == "isActive") {
      if (this.data.isActive == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
    if (this.params.colDef.field == "isAllowBet") {
      if (this.data.isAllowBet == 1) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }
    }
  }

  update(){
    console.log(this.params)
    if (this.data.sportName) {
      if (this.params.colDef.field == "isActive") {
        this.UpdateMarketStatus();
      }
      if (this.params.colDef.field == "isAllowBet") {
        this.UpdateMarketbetStatus();
      }
    }
  }

  UpdateMarketStatus(){
    if (this.isActive) {
      this.data.isActive = 0;
    }
    else {
      this.data.isActive = 1;
    }
    this.sportService.UpdateMktStatus(this.data.id,this.data.isActive).subscribe(data=>{
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
  UpdateMarketbetStatus(){
    if (this.isActive) {
      this.data.isAllowBet = 0;
    }
    else {
      this.data.isAllowBet = 1;
    }
    this.sportService.UpdateMktBetStatus(this.data.id,this.data.isAllowBet).subscribe(data=>{
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


}
