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

  constructor(private dataService: DataService) {
    console.log('The Constructor for the main Blog-Component ran');
  }

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
    let data = {
      title: f.value.title,
      content: f.value.content
    };
    let csrftoken= 'ydDgaxBLCgfzz5rvjLzREaisvs1Q4vtGOknHWCFGXpQes2oz2CDZzdBtDMwVUugt';
    let sessionId= 'dtqvkam8iss95n5wu1kcxiq96ddu91nq';
    this.dataService.newBlog(data, csrftoken, sessionId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
    );
  }

}
