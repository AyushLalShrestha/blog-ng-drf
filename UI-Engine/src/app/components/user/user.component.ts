import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { UserProfile } from './user-profile.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userProfiles: UserProfile[];
  constructor(private dataService: DataService) { 
    this.userProfiles = [];
  }

  ngOnInit() {
    this.dataService.getUserProfiles().subscribe(
      userProfiles => {
        for (let i = 0; i < userProfiles.length; i++) {
          const receivedUP = userProfiles[i];
          const userProfile: UserProfile = new UserProfile(receivedUP['user']['username'], receivedUP['user']['email'],
          receivedUP['user']['first_name'], receivedUP['user']['last_name'], receivedUP['bio'],
          receivedUP['location'], receivedUP['phone']  );
          this.userProfiles.push(userProfile);
        }
      }
    );
  }

}
