import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ShortMessageComponent } from '../components/shared/snackbar/snackbar.component'
import { MatSnackBar } from '@angular/material';


import { Blog, User } from '../components/blog/blog.model';
import { UserProfile } from '../components/user/user-profile.model';
import { Observable } from 'rxjs';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class DataService {
  blogSelected = new EventEmitter<Blog>();
  baseURL = 'http://localhost:5050';

  constructor(public http: HttpClient, private _snackBar: MatSnackBar) {
  }

  getBlogs(pageNumber: Number = 1) {
    return this.http.get<Blog[]>(this.baseURL + '/blog/list/?page=' + pageNumber);
  }
  getBlogDetail(pk: any = 1) {
    return this.http.get<Blog>(this.baseURL + '/blog/' + pk + '/');
  }
  getUsersBlogs(pageNumber: Number = 1) {
    return this.http.get<Blog[]>(this.baseURL + '/blog/list/?selfs_blog=' + true);
  }
  newBlog(data) {
    const today = new Date().toISOString().slice(0, 10);
    const blogData = new FormData();
    blogData.append('title', data.title);
    blogData.append('content', data.content);
    blogData.append('publish', today);

    if (data.image && data.image.name) {
      blogData.append('image', data.image, data.image.name);
    }

    return this.http.post(this.baseURL + '/blog/create/', blogData, {
      withCredentials: true
    });
  }
  editBlog(data: any = null, extract = true) {
    const blogID = data.blogPK;

    if (extract) {
      return this.http.get<Blog>(this.baseURL + '/blog/' + blogID + '/update/', {
        withCredentials: true
      });
    } else {
      const today = new Date().toISOString().slice(0, 10);
      const blogData = new FormData();
      blogData.append('title', data.title);
      blogData.append('content', data.content);
      blogData.append('publish', today);

      if (data.image && data.image.name) {
        blogData.append('image', data.image, data.image.name);
      }

      return this.http.put<Blog>(this.baseURL + '/blog/' + blogID + '/update/', blogData, {
        withCredentials: true
      });
    }
  }
  getUserProfiles() {
    return this.http.get<UserProfile[]>(this.baseURL + '/user/profiles/', { withCredentials: true });
  }
  login(data) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    return this.http.post(this.baseURL + '/user/api-token-login/', formData);
  }
  getSessionDetails() {
    return this.http.get<any>(this.baseURL + '/user/sessionDetails/', { withCredentials: true });
  }
  openSnackBar(message, success = true) {
    var data = {
      message: message,
      success: success
    };

    this._snackBar.openFromComponent(ShortMessageComponent, {
      duration: 2000,
      data: data
    });
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

}


