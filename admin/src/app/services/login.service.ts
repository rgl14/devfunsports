import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient) { }

  Login(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Login`, data)
  }
  Logout(): Observable<any> {
    return this.http.post(`${this.BASEURL}/Logout`, {});
  }
  
}
