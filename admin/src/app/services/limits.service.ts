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
