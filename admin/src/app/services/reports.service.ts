import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  AnalysisReport(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/AnalysisReport`);
  }

  AccountStatement(dates,FILTER,ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/AccountStatement?from=${dates.fromdate}&to=${dates.todate}&filter=${FILTER}&id=${ID}`);
  }

  GetAllMatchPnl(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetAllMatchPnl`);
  }

  RejectBets(id, PWD): Observable<any> {
    return this.http.post(`${this.BASEURL}/Reports/RejectBets?id=${id}&pwd=${PWD}`, {});
  }

  RejectBetsMulti(id, MTID, PWD): Observable<any> {
    return this.http.post(`${this.BASEURL}/Reports/RejectBetsMulti?ids=${id}&mtid=${MTID}&pwd=${PWD}`, {});
  }

  GetBetSlip(MKTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetBetSlip?mktid=${MKTID}`);
  }

  GetCashLedger(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetCashLedger?id=${ID}`);
  }

  GetClientLedgerBal(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetClientLedgerBal?id=${ID}`);
  }

  GetClientMatchReport(MTID, MKTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetClientMatchReport?mtid=${MTID}&mktid=${MKTID}`);
  }

  GetCollectionReport(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetCollectionReport`);
  }

  GetAdmChipsSummary(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetAdmChipsSummary`);
  }

  GetAdmChipsSummary2(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetAdmChipsSummary2?id=${ID}`);
  }

  GetCompanyMatchReport(MTID, MKTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetCompanyMatchReport?mtid=${MTID}&mktid=${MKTID}`);
  }

  GetLedger(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetLedger?id=${ID}`);
  }

  GetLogInOutReport(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetLogInOutReport`);
  }

  GetMatchCollectionReport(MTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetMatchCollectionReport?mtid=${MTID}`);
  }

  GetMatchDashboard(MTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetMatchDashboard?mtid=${MTID}`);
  }

  GetProfitLoss(SIDS, dates): Observable<any> {
    var data=[];
    if(SIDS!=''){
      SIDS.forEach((item) => {
        data.push(item.id)
      });
    }
    return this.http.get(`${this.BASEURL}/Reports/GetProfitLoss?sids=${data.length==0 ? '':data.toString()}&from=${dates.fromdate}&to=${dates.todate}`);
  }

  GetSessionEarningReport(MTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetSessionEarningReport?mtid=${MTID}`);
  }

  GetSportsPnl(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetSportsPnl?id=${ID}`);
  }

  GetTournamentPnl(ID, SID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetTournamentPnl?id=${ID}&sid=${SID}`);
  }

  GetOddsBetSlip(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetOddsBetSlip?mtid=${ID}`);
  }

  GetFancyBetSlip(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetFancyBetSlip?mtid=${ID}`);
  }

  UserCollectionReport(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/UserCollectionReport?id=${ID}`);
  }

  SessionPNl(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/SessionPNl?mtid=${ID}`);
  }
  getTransactions(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Reports/GetAdmFundTransaction`);
  }

}
