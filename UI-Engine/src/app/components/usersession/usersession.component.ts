import { Component, OnInit, Inject, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usersession',
  templateUrl: './usersession.component.html',
  styleUrls: ['./usersession.component.css']
})
export class UsersessionComponent implements OnInit {
  loggedInUser: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.updateSessionDetails();
  }

  onLogin(f: NgForm) {
    const data = {
      username: f.value.username,
      password: f.value.password,
    };
    this.dataService.login(data).subscribe(
      res => {
        if (res['success'] === true) {
          localStorage.setItem('jwt_token', res['token']);
          this.updateSessionDetails();
          this.dataService.openSnackBar("Logged in as " + data.username);
        } else if (res['error']) {
          this.dataService.openSnackBar("Login failed", false);
        }
      },
      err => {
        this.dataService.openSnackBar("error logging in", false);
      }
    );
  }
  onLogout() {
    localStorage.removeItem("jwt_token");
    this.updateSessionDetails();
    this.dataService.openSnackBar("Logged out!!");
  }
  updateSessionDetails() {
    if (localStorage.getItem('jwt_token')) {
      this.dataService.getSessionDetails().subscribe(
        res => {
          this.loggedInUser = res;
        },
        err => {
          this.dataService.openSnackBar("Error retrieving session details", false);
        }
      );
    } else {
      this.loggedInUser = null;
    }

  }
}