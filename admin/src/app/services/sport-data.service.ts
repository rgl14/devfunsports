import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportDataService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  AddMarket(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/AddMarket`, data)
  }

  AddMatch(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/AddMatch`, data)
  }

  AddSports(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/AddSports`, data)
  }
  AddTournament(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/AddSports`, data)
  }

  FetchRunnersData(BFID): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/FetchRunnersData?bfid=${BFID}`, {})
  }

  GetImportRateList(SID, TID, MTID, MKTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetImportRateList?sid=${SID}&tid=${TID}&mtid=${MTID}&mktid=${MKTID}`);
  }

  GetMarketCtlg(): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetMarketCtlg`);
  }

  GetMatchList(SID, TOURID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetMatchList?sid=${SID}&tourid=${TOURID}&isall=${ISALL}&status=${STATUS}`);
  }

  GetMktList(SID, TOURID, MTID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetMktList?sid=${SID}&tourid=${TOURID}&mtid=${MTID}&isall=${ISALL}&status=${STATUS}`);
  }

  GetSportList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetSportList`);
  }
  GetTournamentList(SID, ISALL): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/GetTournamentList?sid=${SID}&isall=${ISALL}`);
  }

  ImportMarket(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/ImportMarket`, data)
  }

  UpdateHawaStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateHawaStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }
  UpdateMatchStatus(MTID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMatchStatus?mtid=${MTID}&status=${STATUS}`, {})
  }
  UpdateMatchStatusbulk(MTIDS, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMatchStatusbulk?mtids=${MTIDS}&status=${STATUS}`, {})
  }

  UpdateMktBetStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMktBetStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }

  UpdateMktBetStatusbulk(MKTIDS, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMktBetStatusbulk?mktids=${MKTIDS}&status=${STATUS}`, {})
  }
  UpdateMktStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMktStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }

  UpdateMktStatusbulk(MKTIDS, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateMktStatusbulk?mktids=${MKTIDS}&status=${STATUS}`, {})
  }

  UpdateSportsStatus(BFID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateSportsStatus?bfid=${BFID}&status=${STATUS}`, {})
  }

  UpdateSportsStatusbulk(BFIDS, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateSportsStatusbulk?bfids=${BFIDS}&status=${STATUS}`, {})
  }

  UpdateTournamentStatus(BFID, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateTournamentStatus?bfid=${BFID}&status=${STATUS}`, {})
  }

  UpdateTournamentStatusbulk(BFIDS, STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/SportsData/UpdateTournamentStatusbulk?bfids=${BFIDS}&status=${STATUS}`, {})
  }

  SaveMktSettingPackage(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Settings/SaveMktSettingPackage`, data)
  }

  GetMktSettingsPckgList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Settings/GetMktSettingsPckgList`);
  }
  GetMktSettingsPackage(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Settings/GetMktSettingsPackage?id=${ID}`);
  }

  UpdateMktSettingPckg(MKTID,PCKGID): Observable<any> {
    return this.http.post(`${this.BASEURL}/Settings/UpdateMktSettingPckg?mktid=${MKTID}&pckgid=${PCKGID}`, {})
  }

  SaveLiveTvbyMatch(BFMTID, NO, IP, P, HDMI): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveTv/SaveLiveTvbyMatch?bfmtid=${BFMTID}&no=${NO}&ip=${IP}&p=${P}&hdmi=${HDMI}`, {})
  }
  HubAddress(BFID): Observable<any> {
    return this.http.get(`${this.BASEURL}/SportsData/HubAddress?bfid=${BFID}`);
  }
}
