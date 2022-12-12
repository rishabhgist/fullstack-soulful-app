import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.profile = this.profiles.at(this.key);
  }

  profiles: Profile[] = [
    {
      name: "Sneha Shinde",
      city: "Pune, Maharashtra",
      age: "23",
      profile:"sneha" 
    },
    {
      name: "Dimple Goyal",
      city: "Mumbai, Maharashtra",
      age: "24",
      profile: "dimple"
    },
    {
      name: "Akansha Yadav",
      city: "Delhi",
      age: "20",
      profile: "sneha"
    },
    {
      name: "Deepika Bhardwaj",
      city: "Dehradun, Uttrakhand",
      age: "25",
      profile: "deepika"
    },
    {
      name: "Meera Bai",
      city: "Bengluru, Karanataka",
      age: "23",
      profile: "meera"
    }
  ]
  profile: Profile | undefined = {};
  key: number = 0;

  next() {
    if (this.profiles.length-1 > this.key) {
      if (this.profiles != undefined) {
        this.key ++;
        this.profile = this.profiles.at(this.key);
        console.log(this.profiles.length + '' + this.key);

      }
    }else {
        this.key = 0;
    }
  }
}

export type Profile = {
  name?: String,
  city?: String, 
  age?: String,
  profile?: String
}