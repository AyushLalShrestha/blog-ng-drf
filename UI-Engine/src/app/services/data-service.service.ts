import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Blog, User } from '../components/blog/blog.model';
import { UserProfile } from '../components/user/user-profile.model';

@Injectable()
export class DataService {
  blogSelected = new EventEmitter<Blog>();

  constructor(public http: HttpClient) { }

  getBlogs(pageNumber: Number = 1) {
    return this.http.get<Blog[]>('http://localhost:8000/blog/list/?format=json');
  }
  newBlog(data) {
      const headers = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
        const body = {
            title: data.title, content: data.content
        };
      return this.http.post('http://localhost:8000/blog/create/', body, {
        withCredentials: true,
        headers });
  }
  getUserProfiles() {
    return this.http.get<UserProfile[]>('http://localhost:8000/user/profiles/?format=json');
  }
}


