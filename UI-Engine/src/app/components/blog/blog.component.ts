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
  title: String;
  content: String;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.blogSelected.subscribe(
      (blog: Blog) => {
        this.selectedBlog = blog;
      }
    );
    this.title = 'your title here';
    this.content = 'Whatever you want to write';
  }

  onSubmit(f) {
    const data = {
      title: f.value.title,
      content: f.value.content,
      publish: '2018-06-12'
    };
    this.dataService.newBlog(data).subscribe(
      res => {
        alert('successfully posted');
      },
      err => {
        alert('Error occured');
      }
    );

  }

}
