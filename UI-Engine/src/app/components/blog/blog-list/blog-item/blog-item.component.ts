import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../blog.model';
import { DataService } from '../../../../services/data-service.service';
import { Blog } from '../../blog.model';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
  @Input() blog: Blog;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSelected() {
    // alert(this.user.name);
    this.dataService.blogSelected.emit(this.blog);
  }

}
