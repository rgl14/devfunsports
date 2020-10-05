import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  GetScoreInfo(MTID): Observable<any> {
    return this.http.get(`${this.BASEURL}/LiveScore/GetScoreInfo?mtid=${MTID}`);
  }

  GetScoreList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/LiveScore/GetScoreList`);
  }

  AddScore(MTID): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/AddScore?mtid=${MTID}`, {});
  }

  UpdateMatchResult(MTID,RES): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateMatchResult?mtid=${MTID}&res=${RES}`, {});
  }

  UpdateComments(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateComments`, data);
  }

  UpdateScore(TID,RUNS,BALL,WKT): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateScore?tid=${TID}&runs=${RUNS}&ball=${BALL}&wkt=${WKT}`, {});
  }

  UpdateScore2(TID,SCORE,OVER,BALL,WKT): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateScore2?tid=${TID}&score=${SCORE}&over=${OVER}&ball=${BALL}&wkt=${WKT}`, {});
  }

  UpdateScoreTeamStatus(TID,STATUS): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateScoreTeamStatus?tid=${TID}&status=${STATUS}`, {});
  }

  UpdateTossResult(MTID,RES): Observable<any> {
    return this.http.post(`${this.BASEURL}/LiveScore/UpdateTossResult?mtid=${MTID}&res=${RES}`, {});
  }
}
