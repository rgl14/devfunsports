import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-useranalysis',
  templateUrl: './useranalysis.component.html',
  styleUrls: ['./useranalysis.component.css']
})
export class UseranalysisComponent implements OnInit {
  analysisreport: any;

  constructor(private reports:ReportsService) { }

  ngOnInit() {
    this.reports.AnalysisReport().subscribe(resp=>{
      if(resp!=null){
        // console.log(resp)
        this.analysisreport=resp.data;
      }
      
    })
  }

}
