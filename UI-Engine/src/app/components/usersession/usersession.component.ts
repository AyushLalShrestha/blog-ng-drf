import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { UserProfile } from '../user/user-profile.model';

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

  onLogin(f) {
    const data = {
      username: f.value.username,
      password: f.value.password,
    };
    this.dataService.login(data).subscribe(
      res => {
        localStorage.setItem('jwt_token', res['token']);
        this.updateSessionDetails();
        alert("Successfully logged in!")
      },
      err => {
        alert("error logging in");
      }
    );

  }
  onLogout(){
    alert("logging out");
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
