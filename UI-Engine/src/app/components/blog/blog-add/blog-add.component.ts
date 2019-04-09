import { Component, OnInit, Inject } from '@angular/core';
import { Blog } from './../blog.model';
import { DataService } from '../../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  title: String;
  content: String;
  publishDate: String;

  constructor(private dataService: DataService, 
               public dialogRef: MatDialogRef<BlogAddComponent>) { }

  ngOnInit() {
    this.title = '';
    this.content = '';
  }

  onSubmit(f) {
    const data = {
      title: f.value.title,
      content: f.value.content,
      publish: '2018-06-12'
    };
    this.dataService.newBlog(data).subscribe(
      res => {
        alert('successfully posted');
      },
      err => {
        alert('Error occured');
      }
    );

  }
  onCloseClick(): void {
   this.dialogRef.close();
 }

}