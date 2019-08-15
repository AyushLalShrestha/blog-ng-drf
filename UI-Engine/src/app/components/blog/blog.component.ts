import { Component, OnInit, Inject } from '@angular/core';
import { Blog } from './blog.model';

import { BlogAddComponent } from './blog-add/blog-add.component';
import { DataService } from '../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedBlog: Blog;
  name: String;
  animal: String;

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.blogSelected.subscribe(
      (blog: Blog) => {
        this.selectedBlog = blog;
      }
    );
  }

  openAddBlogDialog(): void {
    const dialogRef = this.dialog.open(BlogAddComponent, {
      width: '850px',
      height: '700px',
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      maxHeight: '90vh',
      maxWidth: '80vw',
      minWidth: '80vw',
    });
  }

}

