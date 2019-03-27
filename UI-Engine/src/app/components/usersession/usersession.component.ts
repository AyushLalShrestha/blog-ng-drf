import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-usersession',
  templateUrl: './usersession.component.html',
  styleUrls: ['./usersession.component.css']
})
export class UsersessionComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onLogin(f) {
    const data = {
      username: f.value.username,
      password: f.value.password,
    };
    this.dataService.login(data).subscribe(
      res => {
        localStorage.setItem('jwt_token', res['token']);
      },
      err => {
        alert("error logging in");
      }
    );

  }
  onLogout(){
    alert("logging out");
    localStorage.removeItem("jwt_token");
  }

}
