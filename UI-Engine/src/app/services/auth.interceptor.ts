import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CookieXSRFStrategy } from '@angular/http';

@Injectable()
export class MyHttpXsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'X-XSRF-TOKEN';
        const token = this.tokenExtractor.getToken();
        
        if (token !== null && !req.headers.has(headerName)) {
            const newHeader = { headers: req.headers.set(headerName, token)};
            req = req.clone(newHeader);
        }
        return next.handle(req);
    }
}

