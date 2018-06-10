import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { Blog } from '../blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  // public blogs: Blog[] = [new Blog('a', 'a', 1, new Date(), 2, 'aush', 'asd', 'asd', 'asd', 'bio', 'loc', '123123')];
  public blogs: Blog[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBlogs().subscribe(blogs => {
      console.log(blogs);
      this.blogs = blogs;
    });
  }

}
