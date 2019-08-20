import { Component, OnInit, Inject } from '@angular/core';
import { Blog } from './../blog.model';
import { DataService } from '../../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { TagChipsComponent } from './../../../components/shared/tagchips/tagchips.component';

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
    tags: new FormControl('')
  });

  constructor(private dataService: DataService,
    public dialogRef: MatDialogRef<BlogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    // Differentiates new blog creation or old blog edit action
    this.editAction = false;
    this.blogPK = null;
  }

  ngOnInit() {
    if (this.data && this.data.edit == true && this.data.blogPK) {
      this.editAction = true;
      this.dataService.editBlog(this.data, true).subscribe(
        detailedBlog => {
          this.blogForm.setValue({
            title: detailedBlog.title,
            content: detailedBlog.content,
            tags: detailedBlog.tags || ['']
          });
          this.blogPK = this.data.blogPK;

          if (detailedBlog.image && detailedBlog.image != '') {
            this.dataService.getImage(detailedBlog.image).subscribe(
              data => {
                this.selectedImage = new File([data], 'ayush', { type: 'image/jpeg' });
                // this.createImageFromBlob(data);
              }, error => {
                console.log("Error loading images", error);
              });
          }
        }
      )
    } else {
      this.editAction = false;
    }

  }

  onSubmit() {
    var values = this.blogForm.value;
    console.log(values);
    const data = {
      title: values.title,
      content: values.content,
      image: this.selectedImage
    };
    return;
    // console.log(data);

    // if (!this.editAction) {
    //   this.dataService.newBlog(data).subscribe(
    //     res => {
    //       this.dataService.openSnackBar("Successfully posted");
    //     },
    //     err => {
    //       this.dataService.openSnackBar("Post failed");
    //     }
    //   );
    // } else {
    //   data['blogPK'] = this.blogPK;
    //   this.dataService.editBlog(data, false).subscribe(
    //     res => {
    //       this.dataService.openSnackBar("Successfully edited");
    //     },
    //     err => {
    //       this.dataService.openSnackBar("Edit failed");
    //     }
    //   );
    // }
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onImageChanged(event) {
    const file = event.target.files[0];
    this.selectedImage = file;
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let imageToShow = reader.result; // here is the result you got from reader
      console.log(imageToShow);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  addTags(selectedTags: any[]){
    console.log(selectedTags);
    this.blogForm.patchValue({tags: selectedTags});
    console.log(this.blogForm.value);
  }

}

