import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


import { Blog, User } from '../components/blog/blog.model';
import { UserProfile } from '../components/user/user-profile.model';

@Injectable()
export class DataService {
  blogSelected = new EventEmitter<Blog>();
  baseURL = 'http://localhost:5050';
  constructor(public http: HttpClient) { }

  getBlogs(pageNumber: Number = 1) {
    return this.http.get<Blog[]>(this.baseURL + '/blog/list/?page=' + pageNumber);
  }
  newBlog(data) {
      const today = new Date().toISOString().slice(0, 10);
      const body = {
          title: data.title, content: data.content, publish: today
      };
      return this.http.post(this.baseURL + '/blog/create/', body, {
        withCredentials: true
         });
  }
  getUserProfiles() {
    return this.http.get<UserProfile[]>(this.baseURL + '/user/profiles/', {withCredentials: true});
  }
  login(data) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    return this.http.post(this.baseURL + '/user/api-token-login/', formData);
  }
  
}


