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
      id: 1,
      name: "Sneha Shinde",
      city: "Pune, Maharashtra",
      age: "23",
      profile: "sneha"
    },
    {
      id: 2,
      name: "Dimple Goyal",
      city: "Mumbai, Maharashtra",
      age: "24",
      profile: "dimple"
    },
    {
      id: 3,
      name: "Akansha Yadav",
      city: "Delhi",
      age: "20",
      profile: "akansha"
    },
    {
      id: 4,
      name: "Deepika Bhardwaj",
      city: "Dehradun, Uttrakhand",
      age: "25",
      profile: "deepika"
    },
    {
      id: 5,
      name: "Meera Bai",
      city: "Bengluru, Karanataka",
      age: "23",
      profile: "meera"
    }
  ]
  profile: Profile | undefined = {};
  key: number = 0;

  next() {
    if (this.profiles.length - 1 > this.key) {
      if (this.profiles != undefined) {
        this.key++;
        this.profile = this.profiles.at(this.key);
      }
    } else {
      this.key = 0;
    }
  }

  up(name: string | undefined) {
    if (name) {
      const card = document.getElementById(name);
      const main = document.getElementById(name + '-card');
      main?.style.setProperty('z-index', '1');
      card?.style.setProperty('opacity', '1');
      main?.style.setProperty('transform', 'scale(1.1)');
      
    }
  }
  down(name: string | undefined) {
    if (name) {
      const card = document.getElementById(name);
      const main = document.getElementById(name + '-card');
      card?.style.setProperty('opacity', '0.6');
      main?.style.setProperty('transform', 'scale(1)');
      main?.style.setProperty('z-index', '0');
    }
  }
  remove(name: string | undefined) {
    if (name) {
      const main = document.getElementById( name + '-card');
      main?.style.setProperty('transform', 'translateX(-1500px)');
      setTimeout(() => {
        main?.style.setProperty('display', 'none');
        this.profiles = this.profiles.filter(obj => obj.profile !== name);
        console.log(this.profiles);
      }, 800);
    }
  }
}

export type Profile = {
  id?:number,
  name?: string,
  city?: string, 
  age?: string,
  profile?: string
}