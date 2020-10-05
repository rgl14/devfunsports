import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import _ from 'lodash';
import { hubConnection } from 'signalr-no-jquery';
import { environment } from '../../environments/environment';

import { AnalysisFormatService } from './analysis-format.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisSignalrService {

  private analysisConnection;
  private analysisProxy;
  private analysisHubConn;
  private analysisHubAddress;
  
  analysisSource: Observable<any>;
  private currentAnalysis: BehaviorSubject<any>;

  constructor(private AFService: AnalysisFormatService) {
    this.currentAnalysis = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.analysisSource = this.currentAnalysis.asObservable();
  }

  connectAnalysis(analysisHubAddress, userId) {
    // console.log(analysisHubAddress, userId);
    // this.analysisHubAddress = analysisHubAddress;
    this.analysisHubAddress = environment.baseSite.analyisHub;


    // if(this.analysisHubConn==null){
    this.analysisConnection = hubConnection(this.analysisHubAddress);
    this.analysisProxy = this.analysisConnection.createHubProxy("AnalysisHub");

    this.analysisConnection.start().done((analysisHubConns) => {
      this.analysisHubConn = analysisHubConns;
      console.log("Analysis Hub Connection Established = " + analysisHubConns.state);
      this.analysisProxy.invoke('SubscribeEvent', userId);
    }).fail((analysisHubErr) => {
      console.log("Could not connect Analysis Hub = " + analysisHubErr.state)
    })
    // }


    this.analysisConnection.stateChanged((change) => {
      if (change.newState != 1 && this.analysisHubConn != null && this.analysisHubAddress != null) {
        this.analysisConnection.start().done((analysisHubConns) => {
          this.analysisHubConn = analysisHubConns;
          console.log("Analysis Hub Reconnection Established = " + analysisHubConns.state);

          this.analysisProxy.invoke('SubscribeEvent', userId);

        }).fail((analysisHubErr) => {
          console.log("Could not Reconnect Analysis Hub = " + analysisHubErr.state)
        });
      }
    })


    this.analysisProxy.on("BroadcastSubscribedData", (analysis) => {
      // console.log(analysis);
      analysis = this.AFService.analysisFormat(analysis,userId);
      var allmatch = this.AFService.allMatchdateWiseFormat(analysis);
      // console.log(allmatch);
      this.currentAnalysis.next(analysis);
    });
  }

  unsuscribeAnalysis(userId) {
    if (!this.analysisHubConn) {
      return;
    }
    if (this.analysisHubConn.state == 1) {
      this.analysisHubAddress = null;
      this.analysisProxy.invoke('UnSubscribeEvent', userId);
      this.analysisConnection.stop();
      this.analysisHubConn = null;
      this.analysisConnection = null;
      this.analysisProxy = null;
      this.currentAnalysis.next(null);
    }
  }
}
