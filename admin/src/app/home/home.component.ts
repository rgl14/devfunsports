import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';
import { environment } from '../../environments/environment';
import { userDashboarPosition } from '../classes/userobjects';
import { CompositionService } from '../classes/composition.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userData:userDashboarPosition = {
    netSettlementAmount:0,
    totalProfitNLoss:0,
    totalCurrentExpo:0
  };
  
  userinfo: any;
  currency = environment.baseSite.currency;

  constructor(
    private usermanagement: UsermanagementService,
    private userClass:CompositionService,
    private reportService:ReportsService
    ) { }

  ngOnInit() {
    this.usermanagement.getAccountInfo().subscribe(data => {
      this.userinfo = data.data;
      this.userData = this.userClass.GetDashboardData(this.userinfo.userId, 0, this.userinfo.userType);
    })
  }

}
