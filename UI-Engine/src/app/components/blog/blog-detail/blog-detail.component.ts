import { Component, OnInit, Input, Inject } from '@angular/core';
import { User, Blog } from '../blog.model';
import { DataService } from '../../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: Blog;

  constructor(private dataService: DataService,
     public dialogRef: MatDialogRef<BlogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.dataService.getBlogDetail(this.data.blogPK).subscribe(detailedBlog => {
      this.dataService.blogSelected.emit(detailedBlog);
      this.blog = detailedBlog;
    });
  }

}

export interface DialogData {
  blogPK: string;
}