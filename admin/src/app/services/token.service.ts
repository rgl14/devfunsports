import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token) {
    this.cookieService.set("kancha", token);
  }
  getToken() {
    return this.cookieService.get("kancha");
  }
  removeToken() {
    this.cookieService.delete("kancha");
    window.location.href = "";
  }

  setUserType(UserType) {
    this.cookieService.set("UserType", UserType);
  }
  getUserType() {
    return this.cookieService.get("UserType");
  }
  removeUserType() {
    this.cookieService.delete("UserType");
  }
}
