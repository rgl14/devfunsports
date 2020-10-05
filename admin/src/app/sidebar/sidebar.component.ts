import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userType: number;
  constructor(private usermanagement:UsermanagementService,private sharedata:SharedataService) { }

  ngOnInit() {
    this.sharedata.AccountInfoSource.subscribe(resp=>{
      if(resp!=null){
        this.userType=resp.userType;
        // console.log(resp);
      }
    })
  }
}
