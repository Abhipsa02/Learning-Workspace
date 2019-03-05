import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
//import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { AppAuthService } from '../sharedJs/app.authService';
import { AppUrl } from '../sharedJs/app.constant';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Services
// import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authToken: boolean;
    public copiedReq: any;
    public appToken: any;

    constructor(
        private authService: AppAuthService,
        private toastr: ToastrService,
        private router: Router,
        // private cookiesService: CookieService,
        private localStorageService: LocalStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = AppUrl() + '/login';      
       // this.authToken = this.cookiesService.check('AuthData');
        this.authToken = this.localStorageService.get('AuthData');
        if (this.authToken) {
           // this.appToken  = JSON.parse(this.cookiesService.get('AuthData')).access_token;
            this.appToken  = JSON.parse(this.localStorageService.get('AuthData')).access_token;
        } 

        if (req.url === url) {
            this.copiedReq = req.clone({
                headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Accept', 'application/json')
                                    // .set('Access-Control-Allow-Origin' , '*')
                                    // .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
            });
        } else {
            if (this.appToken) {
                this.copiedReq = req.clone({
                    headers: req.headers.set('Content-Type', 'application/json; charset=utf-8')
                        .set('Accept', 'application/json')
                        .set('Authorization', 'Bearer  ' + this.appToken)
                });
            } else {
                this.copiedReq = req.clone({
                    headers: req.headers.set('Accept', 'application/json')
                });
            }
        }
        // return next.handle(this.copiedReq)
        return next.handle(this.copiedReq).pipe(tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log(event);
          }
        }, (err: any) => {
            if (err.status == 401 && err.statusText == 'Unauthorized') {
                this.localStorageService.clear('decorators');
                this.localStorageService.clear('prefix');
                this.router.navigate(['signin']);
            }
        //   if (err instanceof HttpErrorResponse) {
        //     // this.toastr.error(err);
        //     console.log(err);
        //   }
        }));
    }
}
