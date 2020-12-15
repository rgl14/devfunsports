import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetreportsService {
  BASEURL = environment.baseSite.url;

  constructor(
    private http:HttpClient,
  ) { }
  GetEventAndUser(data):Observable<any>{
    return this.http.post(`${this.BASEURL}/Reports/GetAdmEventByDate`, data);
  }

  GetBetReport(data):Observable<any>{
    return this.http.post(`${this.BASEURL}/Reports/GetBetReport`, data);
  }
}
