import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { Profile } from 'src/app/model/profile.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  profile: Customer[] = [];

  loadUser() {
    this.dataService.findUser();
      this.profile = this.dataService.data;
  }

}
