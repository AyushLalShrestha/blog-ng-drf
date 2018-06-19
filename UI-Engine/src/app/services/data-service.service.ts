import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Blog } from '../components/blog/blog.model';

@Injectable()
export class DataService {
  blogSelected = new EventEmitter<Blog>();

  constructor(public http: HttpClient) { }

  getBlogs() {
    return this.http.get<Blog[]>('http://localhost:8000/blog/list/?format=json');
  }

  // newBlog_old(data) {
  //   return this.http.post('http://localhost:8000/blog/create/', JSON.stringify(data),
  //     {
  //       withCredentials: true,
  //       headers: new Headers({
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       })
  //     }).map(res => res.json());
  // }

  newBlog(data) {
      // const headers = new HttpHeaders().set('content-type', 'application/json');
      const headers = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
        const body = {
            title: data.title, content: data.content
        };
      return this.http.post('http://localhost:8000/blog/create/', body, {
        withCredentials: true,
        headers });
  }

  /** POST: add a new hero to the database */
  // createblog (title, content): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }
}


