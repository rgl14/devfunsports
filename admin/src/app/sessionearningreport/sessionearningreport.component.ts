import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-sessionearningreport',
  templateUrl: './sessionearningreport.component.html',
  styleUrls: ['./sessionearningreport.component.css']
})
export class SessionearningreportComponent implements OnInit {
  matchId: any;
  sessionearning=[];

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetSessionEarningReport(this.matchId).subscribe(resp=>{
      console.log(resp.data);
      this.sessionearning=resp.data;
    })
  }

}
