import { Component, OnInit, Input } from '@angular/core';

import { Blog, User } from '../../blog.model';
import { BlogDetailComponent} from '../../blog-detail/blog-detail.component';
import { DataService } from '../../../../services/data-service.service';

import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.scss']
})
export class BlogItemComponent implements OnInit {
  @Input() blog: Blog;

  constructor(private dataService: DataService,  public dialog: MatDialog) { }

  ngOnInit() {
  }

  onSelected() {
    this.dataService.getBlogDetail(this.blog['pk']).subscribe(detailedBlog => {
      this.dataService.blogSelected.emit(detailedBlog);
    });

  }
  openBlogDetailDialog(blogPK: String): void {
    const dialogRef = this.dialog.open(BlogDetailComponent, {
      // width: '250px',
      data: { blogPK: blogPK}
    });
  }

}
