import { Component, OnInit, Inject } from '@angular/core';
import { Blog } from './../blog.model';
import { DataService } from '../../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  editAction: boolean;
  blogPK: any;

  selectedImage: File;
  blogForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private dataService: DataService,
              public dialogRef: MatDialogRef<BlogAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.editAction = false;
    this.blogPK = null;
  }

  ngOnInit() {
    if (this.data && this.data.edit == true && this.data.blogPK) {
      this.editAction = true;
      this.dataService.editBlog(this.data, true).subscribe(
        detailedBlog => {
          this.blogForm = new FormGroup({
            title: new FormControl(detailedBlog.title),
            content: new FormControl(detailedBlog.content)
          });
          this.blogPK = this.data.blogPK;
        }
      )
    } else {
      this.editAction = false;
    }
    
  }

  onSubmit() {
    var values = this.blogForm.value;
    
    const data = {
      title: values.title,
      content: values.content,
      image: this.selectedImage
    };
    if (!this.editAction) {
      this.dataService.newBlog(data).subscribe(
        res => {
          this.dataService.openSnackBar("Successfully posted");
        },
        err => {
          this.dataService.openSnackBar("Post failed");
        }
      );
    } else {
      data['blogPK'] = this.blogPK;
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

