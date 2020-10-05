import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import _ from 'lodash';

@Component({
  selector: 'app-companyreport',
  templateUrl: './companyreport.component.html',
  styleUrls: ['./companyreport.component.css']
})
export class CompanyreportComponent implements OnInit {
  matchId: string;
  title: string;
  MktId: string;
  companyreport: any;
  companySharetotal: number;
  finaltotal: number;
  matchCommtotal: number;
  matchPlusMinustotal: number;
  mySharetotal: number;
  otherstotal: number;
  plusMinusTotaltotal: number;
  sessionCommtotal: number;
  sessionPlusMinustotal: number;
  sharetotal: number;
  systemPlusMinustotal: number;
  totalCommissiontotal: number;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }
  
  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.title=this.route.snapshot.paramMap.get('title');
    this.MktId=this.route.snapshot.paramMap.get('id');
    this.getreports.GetCompanyMatchReport(this.matchId,this.MktId).subscribe(resp=>{
      this.companyreport=resp.data;
      this.companySharetotal=0;
      this.finaltotal=0;
      this.matchCommtotal=0;
      this.matchPlusMinustotal=0;
      this.mySharetotal=0;
      this.otherstotal=0;
      this.plusMinusTotaltotal=0;
      this.sessionCommtotal=0;
      this.sessionPlusMinustotal=0;
      this.sharetotal=0;
      this.systemPlusMinustotal=0;
      this.totalCommissiontotal=0;
      _.forEach(this.companyreport, (item, index) => {
        this.companySharetotal=this.companySharetotal+parseFloat(item.companyShare);
        this.finaltotal=this.finaltotal+parseFloat(item.final);
        this.matchCommtotal=this.matchCommtotal+parseFloat(item.matchComm);
        this.matchPlusMinustotal=this.matchPlusMinustotal+parseFloat(item.matchPlusMinus);
        this.mySharetotal=this.mySharetotal+parseFloat(item.myShare);
        this.otherstotal=this.otherstotal+parseFloat(item.others);
        this.plusMinusTotaltotal=this.plusMinusTotaltotal+parseFloat(item.plusMinusTotal);
        this.sessionCommtotal=this.sessionCommtotal+parseFloat(item.sessionComm);
        this.sessionPlusMinustotal=this.sessionPlusMinustotal+parseFloat(item.sessionPlusMinus);
        this.sharetotal=this.sharetotal+parseFloat(item.share);
        this.systemPlusMinustotal=this.systemPlusMinustotal+parseFloat(item.systemPlusMinus);
        this.totalCommissiontotal=this.totalCommissiontotal+parseFloat(item.totalCommission);
      });
    })
  }
  trackByFn(index, item) {
    return item.id;
  }
}
