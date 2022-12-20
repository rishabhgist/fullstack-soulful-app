import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { DataService } from '../service/data.service';
import jwtDecode, * as JWT from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  

  ngOnInit(): void {
    this.profile = this.profiles.at(this.key);
    this.loadData();   
  }

  profiles: Customer[] = [];

  profile: Customer | undefined = {};

  key: number = 0;

  loadData() {
   this.dataService.getAllUser();
    this.dataService.getAll().forEach(value => {
      let key = localStorage.getItem('jwtToken');
      if (key) {
        const decode: JWT.JwtPayload = jwtDecode(key);
        let user: Customer = JSON.parse(JSON.stringify(value.filter(obj => obj.email === decode.sub)[0]));
        if (user.gender == 'male') {
          this.profiles = [];
          this.profiles = this.dataService.allUser.filter(obj => obj.gender === 'female');
          console.log(this.profiles);
        } else if (user.gender == 'female') {
          this.profiles = [];
          this.profiles = this.dataService.allUser.filter(obj => obj.gender === 'male');
        }
      }
    })
  }


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
      main?.style.setProperty('opacity', '0');
      setTimeout(() => {
        main?.style.setProperty('display', 'none');
        this.profiles = this.profiles.filter(obj => obj.id !== name);
        console.log(this.profiles);
      }, 600);
    }
  }

  liked(user: string | undefined, id: number | undefined) {
    const main = document.getElementById( user + '-card');
    main?.style.setProperty('transform', 'translateX(1500px)');
    main?.style.setProperty('opacity', '0');
    let likedData: number[] = [];
    if (id) {
      likedData.push(id);
      console.log(id);
    }
    setTimeout(() => {
        main?.style.setProperty('display', 'none');
        let data:Customer [] = this.profiles.filter(obj => obj.id === user);
        this.dataService.likes.push(data[0]);
      }, 600);
   
  }
}

