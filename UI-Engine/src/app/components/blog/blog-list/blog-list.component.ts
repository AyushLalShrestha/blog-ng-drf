
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Blog } from '../blog.model';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


export interface BlogData {
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
    { id: "claps", value: "claps" },
  ];

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<BlogData>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.blogs = [];
    this.displayedColumns = this.columnNames.map(x => x.id);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns list of BlogData from Blogs. */
function getBlogData(blog: Blog): BlogData {
  return {
    title: blog.title,
    content: blog.content,
    user: blog.user.username,
    read_time: blog.read_time,
    publish: blog.publish,
    claps: blog.claps
  }
}