import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsermanagementService {
  BASEURL = environment.baseSite.url;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  changePassword(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/ChangePwd`, data);
  }

  Logout(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Logout`, data);
  }

  getUserType() {
    return this.cookieService.get("UserType");
  }

  getUserlist(userid, CREATORID): Observable<any> {
    return this.http.get(
      `${this.BASEURL}/Usermanagement/Userlist?type=${userid}&Creatorid=${CREATORID}`
    );
  }

  getallUserlist(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Usermanagement/Clientlist`);
  }

  GetNextUsername(usertype): Observable<any> {
    return this.http.get(
      `${this.BASEURL}/Usermanagement/GetNextUsername?type=${usertype}`
    );
  }

  ValidateUsername(username): Observable<any> {
    return this.http.get(
      `${this.BASEURL}/Usermanagement/ValidateUsername?username=${username}`
    );
  }

  getUserStatusUpdate(userId, status, isall): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Usermanagement/UpdateUserStatus?userid=${userId}&status=${status}&isall=${isall}`,
      {}
    );
  }

  getCreatUser(data: any): Observable<any> {
    return this.http.post(`${this.BASEURL}/Usermanagement/AddUser`, data);
  }
  getAddTicker(data: any): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/AddTicker`, data);
  }

  getDeleteTicker(IDS): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/NewsTicker/DeleteTicker?ids=${IDS}`,
      {}
    );
  }

  getTickerList(): Observable<any> {
    return this.http.get(`${this.BASEURL}/NewsTicker/GetTickerList`);
  }

  getUpdateTicker(data: any): Observable<any> {
    return this.http.post(`${this.BASEURL}/NewsTicker/UpdateTicker`, data);
  }

  getUpdateTickerStatus(ID: number, STATUS: any): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/NewsTicker/UpdTickerStatus?id=${ID}&status=${STATUS}`,
      {}
    );
  }

  getUpdateBettingStatus(flag): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Settings/UpdateBettingStatus?flag=${flag}`,
      {}
    );
  }

  getUserInfo(id): Observable<any> {
    return this.http.get(`${this.BASEURL}/Usermanagement/UserInfo?id=${id}`);
  }

  getEditUserData(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Usermanagement/EditUserData`, data);
  }

  getUpdateBetStatus(UserId, Status, isAll): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Usermanagement/UpdateBetStatus?userid=${UserId}&status=${Status}&isall=${isAll}`,
      {}
    );
  }

  getResetPwd(data): Observable<any> {
    return this.http.post(`${this.BASEURL}/Usermanagement/ResetPwd`, data);
  }

  getAccountInfo(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Usermanagement/AccountInfo`);
  }

  getBlockedClient(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Usermanagement/GetBlockedUsers`);
  }

  getRulesReggulations(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Settings/GetRulesNCondition`);
  }

  getSaveRulesNCodition(data: any): Observable<any> {
    return this.http.post(`${this.BASEURL}/Settings/SaveRulesNCondition`, data);
  }

  GetCommNLimits(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Usermanagement/GetCommNLimits`);
  }

  GetBettingStatus(): Observable<any> {
    return this.http.get(`${this.BASEURL}/Settings/GetBettingStatus`);
  }

  UpdateBettingStatus(FLAG): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Settings/UpdateBettingStatus?flag=${FLAG}`,
      {}
    );
  }

  UpdateFixLimits(USERID, LIMIT): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Limits/UpdateFixLimits?userid=${USERID}&limit=${LIMIT}`,
      {}
    );
  }

  UpdateFixLimitsCl(USERID, LIMIT, CURLIMIT): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Limits/UpdateFixLimitsCl?userid=${USERID}&limit=${LIMIT}&curlimit=${CURLIMIT}`,
      {}
    );
  }

  TransferChips(data): Observable<any> {
    return this.http.post(
      `${this.BASEURL}/Funds/TransferChips`,
      data
    );
  }

  DefineAdminFunds(data):Observable<any>{
    return this.http.post(
      `${this.BASEURL}/Funds/DefineAdminFunds`,
      data
    );
  }
}
