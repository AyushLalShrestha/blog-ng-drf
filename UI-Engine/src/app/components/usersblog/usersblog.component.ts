import { Component, OnInit, Inject } from '@angular/core';

import { DataService } from '../../services/data-service.service';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule } from '@angular/material';


@Component({
  selector: 'users-blog',
  templateUrl: './usersblog.component.html',
  styleUrls: ['./usersblog.component.css']
})
export class UsersBlogComponent implements OnInit {

  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() { }

}

