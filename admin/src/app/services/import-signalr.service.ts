import { Injectable } from '@angular/core';
import _ from 'lodash';
import { hubConnection } from 'signalr-no-jquery';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportSignalrService {


  private IMConnection;
  private IMProxy;
  private IMHubConn;

  private IMHubAddress;

  IMSource: Observable<any>;
  private currentIM: BehaviorSubject<any>;

  constructor() {
    this.currentIM = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.IMSource = this.currentIM.asObservable();
  }

  connectMarket(IMHubAddress, market) {
    console.log(IMHubAddress, market);
    this.IMHubAddress = IMHubAddress;

    // if(this.IMHubConn==null){
    this.IMConnection = hubConnection(this.IMHubAddress);
    this.IMProxy = this.IMConnection.createHubProxy("RunnersHub");

    this.IMConnection.start().done((IMHubConns) => {
      this.IMHubConn = IMHubConns;
      console.log("market Hub Connection Established = " + IMHubConns.state);
      _.forEach(market, (item) => {
        this.IMProxy.invoke('SubscribeMarket', item);
      });
    }).fail((marketHubErr) => {
      console.log("Could not connect market Hub = " + marketHubErr.state)
    })
    // }


    this.IMConnection.stateChanged((change) => {
      if (change.newState != 1 && this.IMHubConn != null && this.IMHubAddress != null) {
        this.IMConnection.start().done((IMHubConns) => {
          this.IMHubConn = IMHubConns;
          console.log("market Hub Reconnection Established = " + IMHubConns.state);
          _.forEach(market, (item) => {
            this.IMProxy.invoke('Subscribemarket', item);
          });
        }).fail((marketHubErr) => {
          console.log("Could not Reconnect market Hub = " + marketHubErr.state)
        })
      }
    })


    this.IMProxy.on("BroadcastSubscribedData", (market) => {
      // console.log(market);
      this.currentIM.next(market);
    })
  }

  Unsuscribemarket(market) {
    if (!this.IMHubConn) {
      return;
    }
    if (this.IMHubConn.state == 1) {
      this.IMHubAddress = null;
      _.forEach(market, (item) => {
        this.IMProxy.invoke('UnsubscribeMarket', item);
      });
      this.IMConnection.stop();
      this.IMHubConn = null;
      this.IMConnection = null;
      this.IMProxy = null;
      this.currentIM.next(null);
    }
  }
}
