import { Injectable } from "@angular/core";
import { catchError, retry } from "rxjs/operators";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {};
    const authToken = this.tokenService.getToken();
    if (authToken) {
      headersConfig["Token"] = authToken;
    }
    const _req = req.clone({ setHeaders: headersConfig });
    return next.handle(_req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        if (error.status == 401) {
          this.cookieService.delete("kancha");
          // window.location.reload();
          this.router.navigate(["/login"]);
        }
        return throwError(errorMessage);
      })
    );
  }
}
