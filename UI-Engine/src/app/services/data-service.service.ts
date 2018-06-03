import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Blog } from '../components/blog/blog.model';

@Injectable()
export class DataService {
  blogSelected = new EventEmitter<Blog>();

  constructor(public http: Http) { }

  getBlogs() {
    return this.http.get('http://localhost:8000/blog/list/?format=json')
      .map(res => res.json());
  }

  newBlog(data, csrftoken, sessionId) {
    // return this.http.post('http://localhost:8000/blog/create', JSON.stringify(data), requestOptions)
    //           .map((response: Response) => response.json())
    return this.http.post('http://localhost:8000/blog/create/', JSON.stringify(data),
      {
        withCredentials: true,
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': {
            csrftoken: csrftoken,
            sessionid: sessionId
          }
        })
      }).map(res => res.json());
  }

  /** POST: add a new hero to the database */
  // createblog (title, content): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }
}
