import { Injectable } from '@angular/core';
import { hubConnection } from 'signalr-no-jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookmakerSignalrService {
  private BMConnection;
  private BMProxy;
  private BMHubConn;
  private BMHubAddress;

  BMsource: Observable<any>;
  private BMlist: BehaviorSubject<any>

  constructor() {
    this.BMlist = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.BMsource = this.BMlist.asObservable();
  }

  connectBM(MatchId) {
    // console.log(this.BMHubConn);
    this.BMHubAddress = environment.baseSite.bookHub;;

    // if(this.BMHubConn==null){
    this.BMConnection = hubConnection(this.BMHubAddress);
    this.BMProxy = this.BMConnection.createHubProxy("FancyHub");

    this.BMConnection.start().done((BMHubConns) => {
      this.BMHubConn = BMHubConns;
      console.log("BM Hub Connection Established = " + BMHubConns.state);

      this.BMProxy.invoke('SubscribeFancy', MatchId);

    }).fail((BMHubErr) => {
      console.log("Could not connect BM Hub = " + BMHubErr.state)
    })
    // }


    this.BMConnection.stateChanged((change) => {
      if (change.newState != 1 && this.BMHubConn != null && this.BMHubAddress != null) {
        this.BMConnection.start().done((BMHubConns) => {
          this.BMHubConn = BMHubConns;
          console.log("BM Hub Reconnection Established = " + BMHubConns.state);

          this.BMProxy.invoke('UnsubscribeFancy', MatchId);

          this.BMProxy.invoke('SubscribeFancy', MatchId);

        }).fail((BMHubErr) => {
          console.log("Could not Reconnect BM Hub = " + BMHubErr.state)
        })
      }
    })


    this.BMProxy.on("BroadcastSubscribedData", (BM) => {
      // console.log(BM);
      this.BMlist.next(BM);
    })
  }

  FormatBM(BMdata) {
    var FormattedBMarray = [];
    _.forEach(BMdata, (item, index) => {
      // console.log(item)
      _.forEach(item, (item1, index1) => {
        if (item1.name == "BOOK MAKING")
          // console.log(item1)
          FormattedBMarray.push(item1)
      })
    })
    return FormattedBMarray;
  }

  UnsuscribeBM(MatchId) {
    if (!this.BMHubConn) {
      return;
    }
    if (this.BMHubConn.state == 1) {
      this.BMHubAddress = null;
      this.BMProxy.invoke('UnsubscribeFancy', MatchId);
      this.BMConnection.stop();
      this.BMHubConn = null;
      this.BMConnection = null;
      this.BMProxy = null;
      this.BMlist.next(null);
    }
  }
}
