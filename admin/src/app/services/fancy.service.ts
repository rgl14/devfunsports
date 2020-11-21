import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FancyService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  AddFancy(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/AddFancy`, data);
  }
  AllBallRunning(MTID): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/AllBallRunning?mtid=${MTID}`, {});
  }
  CancelFancybyId(ID, MTID): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/CancelFancybyId?id=${ID}&mtid=${MTID}`, {});
  }
  GetFancyInfobyId(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Fancy/GetFancyInfobyId?id=${ID}`);
  }
  GetFancyList(SPORTID, TOURID, MATCHID, STATUS, ISETTLED): Observable<any> {
    return this.http.get(`${this.BASEURL}/Fancy/GetFancyList?sportid=${SPORTID}&tourid=${TOURID}&matchid=${MATCHID}&status=${STATUS}&isettled=${ISETTLED}`);
  }
  GetFancyTypes(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Fancy/GetFancyTypes`);
  }
  GetAnalysisFancyBook(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Fancy/GetAnalysisFancyBook?id=${ID}`);
  }
  SetFancyCloseBulk(IDS): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/SetFancyCloseBulk?ids=${IDS}`, {});
  }
  UpdateFancy(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/UpdateFancy`, data);
  }
  UpdateFancyBetStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/UpdateFancyBetStatus?id=${ID}&status=${STATUS}`, {});
  }
  UpdateFancyStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/UpdateFancyStatus?id=${ID}&status=${STATUS}`, {});
  }
  UpdFancySettings(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/UpdFancySettings`, data);
  }
  SettleFancy(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Fancy/SettleFancy?mid=${data.MID}&fid=${data.FID}&s=${data.S}`,{});
  }
  UpdateFRateMode(FID,MODE): Observable<any> {
    return this.http.post(`${this.BASEURL}/FancyRates/UpdateFRateMode?fid=${FID}&mode=${MODE}`,{});
  }
  ReverseFancySettlement(FID): Observable<any> {
    return this.http.post(`${this.BASEURL}/FancyRates/ReverseFancySettlement?fid=${FID}`,{});
  }
}
