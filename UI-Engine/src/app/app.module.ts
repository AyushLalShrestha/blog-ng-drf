// import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule,
  MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule,
  MatTableModule, MatCheckboxModule, MatToolbarModule, MatSnackBarModule,
  MatSelectModule, MatSortModule, MatPaginatorModule, MatCheckbox,
  MatChipsModule, MatAutocompleteModule
} from '@angular/material';

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DataService } from './services/data-service.service';
import { MyHttpInterceptor } from './services/auth.interceptor';

import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { UserComponent } from './components/user/user.component';
import { UsersessionComponent } from './components/usersession/usersession.component';
import { UsersBlogComponent } from './components/usersblog/usersblog.component';
import { UsersBlogListComponent } from './components/usersblog/users-blog-list/users-blog-list.component';
import { ShortMessageComponent } from './components/shared/snackbar/snackbar.component';
import { TagChipsComponent } from './components/shared/tagchips/tagchips.component';

const appRoutes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'user', component: UserComponent },
  { path: 'session', component: UsersessionComponent },
  { path: 'users', component: UsersBlogComponent }
];

@NgModule({
  declarations: [
    AppComponent, BlogComponent, UsersBlogComponent,
    BlogAddComponent, BlogDetailComponent,
    BlogListComponent, UsersBlogListComponent,
    UsersessionComponent, UserComponent,
    ShortMessageComponent,
    TagChipsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    MaterializeModule,
    MatDialogModule,
    MatRippleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule

  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true },
    // { provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: { separatorKeyCodes: [ENTER, COMMA] } }
    // { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    BlogDetailComponent, BlogAddComponent, ShortMessageComponent
  ]
})
export class AppModule { }




