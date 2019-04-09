import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { UserProfile } from '../user/user-profile.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usersession',
  templateUrl: './usersession.component.html',
  styleUrls: ['./usersession.component.css']
})
export class UsersessionComponent implements OnInit {
  loggedInUser: any ;
  

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
          alert("Successfully logged in!")
        } else if (res['error']) {
          alert(res['error']);  
        }
        
      },
      err => {
        alert("error logging in");
      }
    );

  }
  onLogout(){
    alert("Logged out");
    localStorage.removeItem("jwt_token");
    this.updateSessionDetails();
  }
  updateSessionDetails(){
    this.dataService.getSessionDetails().subscribe(
      res => {
        this.loggedInUser = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
