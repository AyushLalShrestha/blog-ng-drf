import { Component, OnInit, Inject } from '@angular/core';
import { Blog } from './../blog.model';
import { DataService } from '../../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  editAction: boolean;
  blog: Blog;
  
  title: String;
  content: String;
  selectedImage: File;

  constructor(private dataService: DataService,
    public dialogRef: MatDialogRef<BlogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.blog = null;
      this.editAction = false;
    }

  ngOnInit() {
    if (this.data && this.data.edit == true && this.data.blogPK){
      this.editAction = true;
      this.dataService.editBlog(this.data, true).subscribe(
        detailedBlog => {
          this.blog = detailedBlog;
          this.blog.blog_pk = this.data.blogPK;
          this.title = detailedBlog.title;
          this.content = detailedBlog.content;
        }
      )
    } else {
      this.editAction = false;
      
    }
  }

  onSubmit(f) {
    const data = {
      title: f.value.title,
      content: f.value.content,
      image: this.selectedImage
    };
    if (!this.editAction){
      this.dataService.newBlog(data).subscribe(
        res => {
          this.dataService.openSnackBar("Successfully posted");
        },
        err => {
          this.dataService.openSnackBar("Post failed");
        }
      );
    } else {
      data['blogPK'] = this.blog.blog_pk;
      this.dataService.editBlog(data, false).subscribe(
        res => {
          this.dataService.openSnackBar("Successfully edited");
        },
        err => {
          this.dataService.openSnackBar("Edit failed");
        }
      );
    }
    

  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onImageChanged(event) {
    const file = event.target.files[0];
    this.selectedImage = file;
  }

}

