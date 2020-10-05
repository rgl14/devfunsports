import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserrolesService {
  BASEURL = environment.baseSite.url;

  constructor(private http : HttpClient) { }
  AddRole(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Roles/AddRole`, data);
  }
  EditRole(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Roles/EditRole`, data);
  }
  GetRoleInfobyId(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Roles/GetRoleInfobyId?id=${ID}`);
  }
  GetRoles(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Roles/GetRoles`);
  }
  GetRoleInfobyUserId(ID): Observable<any> {
    return this.http.get(`${this.BASEURL}/Roles/GetRoleInfobyUserId`);
  }
  GetRolesList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Roles/GetRolesList`);
  }
}
