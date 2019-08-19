import { Component, OnInit, Inject } from '@angular/core';

import { DataService } from '../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';
import { BlogAddComponent } from '../blog/blog-add/blog-add.component';


@Component({
  selector: 'users-blog',
  templateUrl: './usersblog.component.html',
  styleUrls: ['./usersblog.component.css']
})
export class UsersBlogComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() { }

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

