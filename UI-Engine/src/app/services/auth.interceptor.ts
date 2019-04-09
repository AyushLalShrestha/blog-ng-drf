import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieXSRFStrategy } from '@angular/http';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    // constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem("jwt_token");
        
        if (idToken) {
            // const headers = new HttpHeaders().set('X-CSRFToken', '8ipjC3UCLyakUNp1t9C3ZeiQVtzBH2NerMY0ayMnb6qxCpY9gvXOrP3JrouFThWp');
            const newHeader = {headers: req.headers.set("Authorization", "Bearer " + idToken)}
            const cloned = req.clone(newHeader);

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}

