import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpXsrfInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'X-XSRF-TOKEN';
        const token = this.tokenExtractor.getToken();
        // const headerName = 'X-XSRF-TOKEN';
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6MSwiZW1haWwiOiJtZXNzYWdlYXl1c2hAZ21haWwuY29tIiwiZXhwIjoxNTM4MTk5NzAyfQ.wh8beErBaVdJaWh8AvfrzFFqODHQcTF8BXY--6fwdTA';
        if (token !== null && !req.headers.has(headerName)) {
            console.log('Adding the token');
            const newHeader = { headers: req.headers.set(headerName, token)};
            req = req.clone(newHeader);
        }
        return next.handle(req);
    }
}

