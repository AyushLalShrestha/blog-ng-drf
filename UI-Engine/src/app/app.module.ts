
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { DataService } from './services/data-service.service';
import { MyHttpXsrfInterceptor } from './services/auth.interceptor';
import { AppComponent } from './app.component';

import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogItemComponent } from './components/blog/blog-list/blog-item/blog-item.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { UserComponent } from './components/user/user.component';
import { UsersessionComponent } from './components/usersession/usersession.component';

const appRoutes: Routes = [
  {path: '', component: BlogComponent},
  {path: 'user', component: UserComponent},
  {path: 'session', component: UsersessionComponent},
];

@NgModule({
  declarations: [
    AppComponent, BlogComponent, BlogListComponent, BlogItemComponent,
    BlogDetailComponent,
    UserComponent,
    UsersessionComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule, 
    HttpClientModule, 
    RouterModule.forRoot(appRoutes)
    // MaterializeModule
  ],
  providers: [ DataService,
      { provide: HTTP_INTERCEPTORS, useClass: MyHttpXsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




