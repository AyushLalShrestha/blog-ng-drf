import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBlogs().subscribe(blogs => {
      this.blogs = blogs['results'];
    });
  }

}
