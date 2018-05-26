import { Component, OnInit } from '@angular/core';
import { Blog } from './blog.model';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedBlog: Blog;

  constructor(private dataService: DataService) {
    console.log('The Constructor for the main Blog-Component ran');
  }

  ngOnInit() {
    this.dataService.blogSelected.subscribe(
      (blog: Blog) => {
        this.selectedBlog = blog;
      }
    );
  }

}
