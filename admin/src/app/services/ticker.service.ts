import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TickerService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  AddTicker(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/AddTicker`, data);
  }
  DeleteTicker(id): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/DeleteTicker?ids=${id}`, {});
  }
  UpdateTicker(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/UpdateTicker`, data);
  }
  UpdTickerStatus(id,status): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/UpdTickerStatus?id=${id}&status=${status}`, {});
  }
  GetTickerList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/NewsTicker/GetTickerList`);
  }
}
