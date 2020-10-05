import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import _ from 'lodash';

@Component({
  selector: 'app-clientreport',
  templateUrl: './clientreport.component.html',
  styleUrls: ['./clientreport.component.css']
})
export class ClientreportComponent implements OnInit {
  title: string;
  matchId: string;
  MktId: string;
  clientmatchreport: any;
  finaltotal: number;
  matchCommtotal: number;
  matchPlusMinustotal: number;
  otherstotal: number;
  plusMinusTotaltotal: number;
  sessionCommtotal: number;
  sessionPlusMinustotal: number;
  nettotal: number;
  totalCommissiontotal: number;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.MktId=this.route.snapshot.paramMap.get('id');
    this.getreports.GetClientMatchReport(this.matchId,this.MktId).subscribe(resp=>{
      console.log(resp);
      this.clientmatchreport=resp.data;
      this.finaltotal=0;
      this.matchCommtotal=0;
      this.matchPlusMinustotal=0;
      this.otherstotal=0;
      this.plusMinusTotaltotal=0;
      this.sessionCommtotal=0;
      this.sessionPlusMinustotal=0;
      this.nettotal=0;
      this.totalCommissiontotal=0;
      _.forEach(this.clientmatchreport, (item, index) => {
        this.finaltotal=this.finaltotal+parseFloat(item.final);
        this.matchCommtotal=this.matchCommtotal+parseFloat(item.matchComm);
        this.matchPlusMinustotal=this.matchPlusMinustotal+parseFloat(item.matchPlusMinus);
        this.otherstotal=this.otherstotal+parseFloat(item.others);
        this.plusMinusTotaltotal=this.plusMinusTotaltotal+parseFloat(item.plusMinusTotal);
        this.sessionCommtotal=this.sessionCommtotal+parseFloat(item.sessionComm);
        this.sessionPlusMinustotal=this.sessionPlusMinustotal+parseFloat(item.sessionPlusMinus);
        this.totalCommissiontotal=this.totalCommissiontotal+parseFloat(item.totalComm);
        this.nettotal=this.nettotal+parseFloat(item.net);
      });
    })
  }
  trackByFn(index, item) {
    return item.id;
  }

}
