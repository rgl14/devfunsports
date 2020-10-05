import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { Subscription } from 'rxjs';
import { AnalysisFormatService } from '../services/analysis-format.service';
import { BookmakerSignalrService } from '../services/bookmaker-signalr.service';

@Component({
  selector: 'app-inplaylist',
  templateUrl: './inplaylist.component.html',
  styleUrls: ['./inplaylist.component.css']
})
export class InplaylistComponent implements OnInit,OnDestroy {
  analysissubscribe:Subscription;
  inplayData: any[];
  BMboorate: Subscription;
  bookfarmatted=[];
  constructor(private analysisservice:AnalysisSignalrService,private anlysisformat:AnalysisFormatService,private Bookmaker:BookmakerSignalrService) { }

  ngOnInit() {
    this.analysissubscribe=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        this.inplayData=this.anlysisformat.inplayWise(resp,'1');
        // console.log(this.inplayData)
      }
    })
    this.Bookmaker.connectBM('1');

    this.BMboorate=this.Bookmaker.BMsource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp.data)
        this.bookfarmatted=this.Bookmaker.FormatBM(resp.data);
        // console.log(this.bookfarmatted)
      }
    })
  }
  trackByFn(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return index;
   }
  ngOnDestroy(){
    this.analysissubscribe.unsubscribe();
    this.BMboorate.unsubscribe();
    this.Bookmaker.UnsuscribeBM("1");
  }

}
