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

  openAddBlogDialog():void {
    const dialogRef = this.dialog.open(BlogAddComponent, {
      width: '850px',
      height: '600px'
    });
  }

  /* openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  } */

}

// This was for the example modal, dialog
/* export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  ngOnInit(){
    alert("Initialized");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

} */
