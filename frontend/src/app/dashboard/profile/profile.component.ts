import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { Profile } from 'src/app/model/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.profile.values());

  }
  profile: Customer[] = [
    {
    name: "Rishabh Gupta",
    age: 23,
    gender: "Male",
    city: "New York", 
    email: 'rr@gmail.com'}
  ]


}
