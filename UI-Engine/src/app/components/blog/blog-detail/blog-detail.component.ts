import { Component, OnInit, Input } from '@angular/core';
import { User, Blog } from '../blog.model';
import { DataService } from '../../../services/data-service.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  @Input() blog: Blog;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // alert(this.user.address);
  }

}
