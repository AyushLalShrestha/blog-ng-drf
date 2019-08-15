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
  title: String;
  content: String;
  publishDate: String;
  selectedImage: File;

  constructor(private dataService: DataService,
    public dialogRef: MatDialogRef<BlogAddComponent>) { }

  ngOnInit() {
    this.title = '';
    this.content = '';
  }

  onSubmit(f) {
    console.log(this.selectedImage);
    const data = {
      title: f.value.title,
      content: f.value.content,
      image: this.selectedImage
    };
    this.dataService.newBlog(data).subscribe(
      res => {
        this.dataService.openSnackBar("Successfully posted");
      },
      err => {
        this.dataService.openSnackBar("Post failed");
      }
    );

  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onImageChanged(event) {
    const file = event.target.files[0];
    this.selectedImage = file;
  }

}

