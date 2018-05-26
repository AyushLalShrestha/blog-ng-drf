import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
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

}
