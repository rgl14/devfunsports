import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { SportDataService } from '../services/sport-data.service';
import { FancySignalrService } from '../services/fancy-signalr.service';
import { MarketSignalrService } from '../services/market-signalr.service';
import { Subscription } from 'rxjs';
import _ from "lodash";
import { FancyService } from '../services/fancy.service';

@Component({
  selector: 'app-livereport',
  templateUrl: './livereport.component.html',
  styleUrls: ['./livereport.component.css']
})
export class LivereportComponent implements OnInit,OnDestroy {
  sportBfId: string;
  bfId: string;
  matchid: string;
  analysiseventdata: Subscription;
  analysisevent: any;
  analysisdata: Subscription;
  Event: any;
  Eventname: any;
  EventDate: any;
  isInplay: any;
  tvConfig: any;
  fancyList=[];
  AllMarkets: any;
  EventMarketId: any;
  Fancysignalrdata: Subscription;
  BookRates=[];
  curTime: any;
  fancyname: any;
  fancybook=[];
  admReport: any;
  bookData: any;
  bmBookData: any;
  MObetdata: any;
  fancyBetdata: any;
  bmBetdata: any;
  oldrunnerData: any;
  isMarketSignalr: boolean=false;

  constructor(
    private route:ActivatedRoute,
    private analysisservice:AnalysisSignalrService,
    private sportdataservice:SportDataService,
    private fancysignalrservice:FancySignalrService,
    private marketservice:MarketSignalrService,
    private fancyservice:FancyService
    ) { }

  ngOnInit() {
    this.sportBfId=this.route.snapshot.paramMap.get('sportBfId');
    this.bfId=this.route.snapshot.paramMap.get('bfId');
    this.matchid=this.route.snapshot.paramMap.get('id');
    var count=0;
    this.analysisdata=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp);
        count++;
        this.analysiseventdata=resp;
        this.Event=this.analysiseventdata[this.sportBfId].eventList[this.bfId];
        console.log(this.Event)
        this.Eventname=this.Event.name;
        this.EventDate=this.Event.eventDate;
        this.isInplay=this.Event.isInplay;
        this.tvConfig=this.Event.tvConfig;
        this.admReport=this.Event._admReport[1];
        this.bookData=this.admReport.bookData;
        this.bmBookData=this.admReport.bmBookData;
        this.MObetdata=this.admReport.moBetdata;
        this.fancyBetdata=this.admReport.fancyBetdata;
        this.bmBetdata=this.admReport.bmBetdata;
        // this.fancyList=this.Event.fancyList;
        if(!this.isMarketSignalr){
          this.AllMarkets=this.Event.mktList;
          console.log(this.AllMarkets);
        }
        console.log(this.AllMarkets[0].runnerData[0]["book"]);

        if(this.bookData.runner1name!=null){
        _.forEach(this.AllMarkets[0].runnerData,(item,index) => {
          if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner1name){
            this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner1Book;
          }
          if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner2name){
            this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner2Book;
          }
          if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner3name){
            this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner3Book;
          }
        });
          
        //   this.AllMarkets[0].runnerData[this.bookData.runner1name]["book"]=this.bookData.runner1Book;
        //   this.AllMarkets[0].runnerData[this.bookData.runner2name]["book"]=this.bookData.runner2Book;
        //   if(this.bookData.runner3name!=null){
        //     this.AllMarkets[0].runnerData[this.bookData.runner3name]["book"]=this.bookData.runner3Book;
        //   }
        }
        this.EventMarketId=this.Event.mktList[0].bfId;
        if(count==1){
          this.getHubaddress();
          this.fancysignalrservice.connectFancy('http://173.249.43.228:11111',this.matchid);
        }
      }
    })
    
  }

  getHubaddress(){
    this.sportdataservice.HubAddress(this.EventMarketId).subscribe(resp=>{
      // console.log(resp)
      if(resp!=null){
        this.marketservice.connectMarket(resp,this.AllMarkets);
      }
      this.marketservice.marketSource.subscribe(runner=>{
        if(runner!=null){
          this.isMarketSignalr=true;
          // console.log(runner)
          let marketIndex = _.findIndex(this.AllMarkets, function(o) {
            return o.bfId == runner.marketid;
          });
          if (marketIndex > -1) {
            // this.selectionid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
            let MktRunnerData = this.AllMarkets[marketIndex].runnerData;
            // this.noSpaceMarketid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
            var txt = runner.runner.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
            _.forEach(MktRunnerData, (item, index) => {
              if (item.runnerName == runner.runner) {
                this.oldrunnerData = MktRunnerData[index];
                this.AllMarkets[marketIndex].runnerData[index] = runner;
                this.AllMarkets[marketIndex].runnerData[index]["runnerName"] =runner.runner;
                this.AllMarkets[marketIndex].runnerData[index]["status"] =runner.runnerStatus;
                if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner1name){
                  this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner1Book;
                }
                if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner2name){
                  this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner2Book;
                }
                if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner3name){
                  this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner3Book;
                }
                  if ((item.back1 != runner.back1 ||item.backSize1 != runner.backSize1)) {
                    $( "#selection_"+ txt + " .back-1").addClass("spark");
                    const back1 = $("#selection_"+ txt + " .back-1");
                    this.removeChangeClass(back1);
                  }
                  if ((item.back2 != runner.back2 ||item.backSize2 != runner.backSize2) ) {
                    $("#selection_" + txt + " .back-2").addClass("spark");
                    const back2 = $("#selection_"+ txt + " .back-2");
                    this.removeChangeClass(back2);
                  }
                  if ((item.back3 != runner.back3 ||item.backSize3 != runner.backSize3) ) {
                    $("#selection_"+ txt + " .back-3").addClass("spark");
                    const back3 = $("#selection_"+ txt + " .back-3");
                    this.removeChangeClass(back3);
                  }
    
                  if ((item.lay1 != runner.lay1 ||item.laySize1 != runner.laySize1) ) {
                    $("#selection_"+ txt + " .lay-1").addClass("spark");
                    const lay1 = $("#selection_"+ txt + " .lay-1");
                    this.removeChangeClass(lay1);
                  }
                  if (
                    (item.lay2 != runner.lay2 ||item.laySize2 != runner.laySize2) ) {
                    $("#selection_"+ txt + " .lay-2").addClass("spark");
                    const lay2 = $("#selection_"+ txt + " .lay-2");
                    this.removeChangeClass(lay2);
                  }
                  if ((item.lay3 != runner.lay3 || item.laySize3 != runner.laySize3) ) {
                    $("#selection_" + txt + " .lay-3").addClass("spark");
                    const lay3 = $("#selection_"+ txt + " .lay-3");
                    this.removeChangeClass(lay3);
                  }
                // }
              }
            });
          }
        }
      })
      
      this.Fancysignalrdata=this.fancysignalrservice.fancySource.subscribe(fancy=>{
        if(fancy!=null){
          // console.log(fancy);
          this.fancyList=fancy.data;
          this.BookRates=fancy.bookRates;
          this.curTime=fancy.curTime;
        }
      })
    })
  }
  removeChangeClass(changeClass) {
    setTimeout(() => {
      changeClass.removeClass("spark");
    }, 300);
  }

  getAnalysisfancyBook(id,name){
    this.fancyname=name;
    this.fancyservice.GetAnalysisFancyBook(id).subscribe(resp=>{
      this.fancybook=resp.data;
    })
  }

  trackByfancyId(index,item){
    // console.log(item.id)
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.id;
   }
   identify(index,item){
    return item.id;
   }

  ngOnDestroy(){
    if(this.Event!=undefined){
      this.analysisdata.unsubscribe();
      this.marketservice.UnsuscribeMarkets(this.AllMarkets);
      this.fancysignalrservice.UnsuscribeFancy(this.matchid);
      this.Fancysignalrdata.unsubscribe();
      this.isMarketSignalr=false;
    }
  }
}
