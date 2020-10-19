import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {
  BASEURL = environment.baseSite.url;

  constructor(private http : HttpClient) { }

  PayCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Limits/PayCash?userid=${data.USERID}&amount=${data.AMOUNT}`, {});
  }

  ReceiveCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Limits/ReceiveCash?userid=${data.USERID}&amount=${data.AMOUNT}`, {});
  }
  
  //Company to lower level settlements
  SettleCompanyDoubleSuperCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyDoubleSuperCash`, data);
  }

  SettleCompanySuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanySuperMasterCash`, data);
  }

  SettleCompanyMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyMasterCash`, data);
  }

  SettleCompanyAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyAgentCash`, data);
  }

  //Double Super to lower level settlements
  SettleDoubleSupSuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSupSuperMasterCash`, data);
  }

  SettleDoubleSuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperMasterCash`, data);
  }

  SettleDoubleSuperAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperAgentCash`, data);
  }

  //Super Master to lower level settlements
  SettleSuperMasterMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterMasterCash`, data);
  }

  SettleSuperMasterAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterAgentCash`, data);
  }

  SettleSuperMasterClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterClientCash`, data);
  }

  //Master to lower level settlements
  SettleMasterAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterAgentCash`, data);
  }

  SettleMasterClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterClientCash`, data);
  }

  //Master to lower level settlements
  SettleAgentClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleAgentClientCash`, data);
  }

  UpdateFixLimits(USERID,LIMIT): Observable<any> {
    return this.http.post(`${this.BASEURL}/Limits/UpdateFixLimits?userid=${USERID}&limit=${LIMIT}`, {});
  }

  UpdateFixLimitsCl(USERID,LIMIT,CURLIMIT): Observable<any> {
    return this.http.post(`${this.BASEURL}/Limits/UpdateFixLimitsCl?userid=${USERID}&limit=${LIMIT}&curlimit=${CURLIMIT}`, {});
  }

  GetCoinHistory(USERID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Limits/GetCoinHistory?userid=${USERID}`);
  }

}
