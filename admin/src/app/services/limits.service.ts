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

  SettleCompanyDoubleSuperCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyDoubleSuperCash2`, data);
  }

  SettleCompanySuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanySuperMasterCash`, data);
  }

  SettleCompanySuperMasterCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanySuperMasterCash2`, data);
  }

  SettleCompanyMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyMasterCash`, data);
  }

  SettleCompanyMasterCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyMasterCash2`, data);
  }

  SettleCompanyAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyAgentCash`, data);
  }

  SettleCompanyAgentCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleCompanyAgentCash2`, data);
  }

  //Double Super to lower level settlements
  SettleDoubleSupSuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSupSuperMasterCash`, data);
  }

  SettleDoubleSupSuperMasterCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSupSuperMasterCash2`, data);
  }

  SettleDoubleSuperMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperMasterCash`, data);
  }

  SettleDoubleSuperMasterCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperMasterCash2`, data);
  }

  SettleDoubleSuperAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperAgentCash`, data);
  }

  SettleDoubleSuperAgentCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleDoubleSuperAgentCash2`, data);
  }

  //Super Master to lower level settlements
  SettleSuperMasterMasterCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterMasterCash`, data);
  }

  SettleSuperMasterMasterCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterMasterCash2`, data);
  }

  SettleSuperMasterAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterAgentCash`, data);
  }

  SettleSuperMasterAgentCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterAgentCash2`, data);
  }

  SettleSuperMasterClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterClientCash`, data);
  }

  SettleSuperMasterClientCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleSuperMasterClientCash2`, data);
  }

  //Master to lower level settlements
  SettleMasterAgentCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterAgentCash`, data);
  }

  SettleMasterAgentCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterAgentCash2`, data);
  }

  SettleMasterClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterClientCash`, data);
  }

  SettleMasterClientCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleMasterClientCash2`, data);
  }

  //Agent to lower level settlements
  SettleAgentClientCash(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleAgentClientCash`, data);
  }
  SettleAgentClientCash2(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Funds/SettleAgentClientCash2`, data);
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
