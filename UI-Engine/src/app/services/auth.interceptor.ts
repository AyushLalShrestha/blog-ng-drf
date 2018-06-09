import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
    HttpClientModule, HttpClientXsrfModule, HttpRequest,
    HttpHandler, HttpEvent,
    HttpXsrfTokenExtractor, HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class MyHttpXsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'X-XSRF-TOKEN';
        console.log('Intercepting: ' + req);
        const token = this.tokenExtractor.getToken() as string;
        // const token = '3tngoxEZxgQFBsigfRQ5gMMVpzaqCo95F7TXE0LNUfZf1mg96LZNgM8L5KryDQCV';
        if (token !== null && !req.headers.has(headerName)) {
            req = req.clone({ headers: req.headers.set(headerName, token) });
        }
        return next.handle(req);
    }
}

