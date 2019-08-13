
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Blog } from '../blog.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';


export interface BlogData {
  blog_pk: number,
  title: string;
  content: string;
  user: String;
  read_time: number;
  publish: Date;
  claps: number;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})

export class BlogListComponent implements OnInit {

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
    this.updateBlogs();
  }

  updateBlogs() {
    this.dataService.getBlogs().subscribe(blogs => {
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
    const dialogRef = this.dialog.open(BlogDetailComponent, {
      width: '800px',
      height: '700px',
      disableClose: false,
      hasBackdrop: true,
      data: { blogPK: blogPK},
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '90vw',
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