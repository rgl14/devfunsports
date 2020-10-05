import { Injectable } from '@angular/core';
import { hubConnection } from 'signalr-no-jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FancySignalrService {

  private fancyConnection;
  private fancyProxy;
  private fancyHubConn;
  private fancyHubAddress;

  fancySource: Observable<any>;
  private currentFancy: BehaviorSubject<any>;

  constructor() {
    // console.log('Hello FancyProvider Provider');
    this.currentFancy = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.fancySource = this.currentFancy.asObservable();
  }

  connectFancy(fancyHubAddress, MatchId) {
    // console.log(this.fancyHubConn);
    // this.fancyHubAddress = fancyHubAddress;
    this.fancyHubAddress = environment.baseSite.fancyHub;
    // if(this.fancyHubConn==null){
    this.fancyConnection = hubConnection(this.fancyHubAddress);
    this.fancyProxy = this.fancyConnection.createHubProxy("FancyHub");

    this.fancyConnection.start().done((fancyHubConns) => {
      this.fancyHubConn = fancyHubConns;
      console.log("Fancy Hub Connection Established = " + fancyHubConns.state);

      this.fancyProxy.invoke('SubscribeFancy', MatchId);

    }).fail((fancyHubErr) => {
      console.log("Could not connect Fancy Hub = " + fancyHubErr.state)
    })
    // }


    this.fancyConnection.stateChanged((change) => {
      if (change.newState != 1 && this.fancyHubConn != null && this.fancyHubAddress != null) {
        this.fancyConnection.start().done((fancyHubConns) => {
          this.fancyHubConn = fancyHubConns;
          console.log("Fancy Hub Reconnection Established = " + fancyHubConns.state);

          this.fancyProxy.invoke('UnsubscribeFancy', MatchId);

          this.fancyProxy.invoke('SubscribeFancy', MatchId);

        }).fail((fancyHubErr) => {
          console.log("Could not Reconnect Fancy Hub = " + fancyHubErr.state)
        })
      }
    })


    this.fancyProxy.on("BroadcastSubscribedData", (fancy) => {
      // console.log(fancy);
      this.currentFancy.next(fancy);
    })
  }

  UnsuscribeFancy(MatchId) {
    if (!this.fancyHubConn) {
      return;
    }
    if (this.fancyHubConn.state == 1) {
      this.fancyHubAddress = null;
      this.fancyProxy.invoke('UnsubscribeFancy', MatchId);
      this.fancyConnection.stop();
      this.fancyHubConn = null;
      this.fancyConnection = null;
      this.fancyProxy = null;
      this.currentFancy.next(null);
    }
  }

}
