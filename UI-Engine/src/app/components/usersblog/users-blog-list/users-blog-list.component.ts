
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data-service.service';


import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlogDetailComponent } from '../../blog/blog-detail/blog-detail.component';

import { Blog, BlogData } from '../../shared/shared.models';
import { BlogAddComponent } from '../../blog/blog-add/blog-add.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'users-blog-list',
  templateUrl: './users-blog-list.component.html',
  styleUrls: ['./users-blog-list.component.css']
})
export class UsersBlogListComponent implements OnInit {
  public blogs: Blog[];

  columnNames = [
    { id: "title", value: "title" },
    { id: "user", value: "user" },
    { id: "publish", value: "publish" },
    { id: "claps", value: "claps" }
  ];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<BlogData>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.blogs = [];
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.displayedColumns.push('actions');
    this.updateUsersBlogs();
  }

  updateUsersBlogs() {
    this.dataService.getUsersBlogs().subscribe(blogs => {
      this.blogs = blogs['results'];
      this.dataSource = new MatTableDataSource(Array.from(this.blogs, blog => getBlogData(blog)));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    err => {
      this.dataService.openSnackBar("Error retrieving data", false);
    });

  }

  openBlogDetailDialog(blogPK: String): void {
    const blogDetailDialogRef = this.dialog.open(BlogDetailComponent, {
      width: '800px',
      height: '700px',
      disableClose: false,
      hasBackdrop: true,
      data: { blogPK: blogPK},
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '80vw',
      minWidth: '80vw',
    });
  }

  openBlogEditDialog(blogPK: String): void {
    const blogEditDialogRef = this.dialog.open(BlogAddComponent, {
      width: '800px',
      height: '700px',
      disableClose: false,
      hasBackdrop: true,
      data: { 
        blogPK: blogPK,
        edit: true
      },
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '80vw',
      minWidth: '80vw',
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns list of BlogData from Blogs. */
function getBlogData(blog: any): BlogData {
  return {
    blog_pk: blog.pk,
    title: blog.title,
    content: blog.content,
    user: blog.user.username,
    read_time: blog.read_time,
    publish: blog.publish,
    claps: blog.claps
  }
}