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
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUserProfiles().subscribe(
      userProfiles => {
        console.log(userProfiles);
        this.userProfiles = userProfiles;
      }
    );
  }

}
