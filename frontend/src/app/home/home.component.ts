import { Component, OnInit } from '@angular/core';
import { Customer } from '../model/customer.model';
import { DataService } from '../service/data.service';
import jwtDecode, * as JWT from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService, private _snackBar:MatSnackBar) { }

  

  ngOnInit(): void {
    this.profile = this.profiles.at(this.key);
    this.loadData();   
  }
  profileUp: number = 0;
  profileDown: number = 4;

  profiles: Customer[] = [];

  pNearBy: Customer[] = [];

  profile: Customer | undefined = {};

  key: number = 0;

  slider(type: string) {
      let id: string | undefined = this.profiles[this.profileUp]?.id;
      let dwId: string | undefined = this.profiles[this.profileDown-1]?.id;
    if (type === 'right' && this.profileDown <= this.profiles.length) {
      if (id || dwId) {
        const file = document.getElementById(id + '-card');
        file?.style.setProperty('transform', 'translateX(-1500px)');
        setTimeout(() => {
         this.profileUp++;
         this.profileDown++;  
        }, 500);
        // dwId = this.profiles[this.profileDown-1]?.id;
        // const dwfile = document.getElementById(dwId + '-card');
        // dwfile?.style.setProperty('opacity', '0 !important');
        // dwfile?.style.setProperty('transform', 'translateX(1500px)');
        // setTimeout(() => {
        //   dwfile?.style.setProperty('transform', 'translateX(0px)');
        //   dwfile?.style.setProperty('opacity', '1');

        // }, 400);
      }
    } else if (type === 'left' && this.profileUp != 0) {
      if (id || dwId) {     
        const file = document.getElementById(id + '-card');
        const dwfile = document.getElementById(dwId + '-card');
        dwfile?.style.setProperty('transform', 'translateX(1500px)');
        setTimeout(() => {
        this.profileUp--;
        this.profileDown--;
        }, 500);
      }
    }
  }

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
          // console.log(this.profiles);
        } else if (user.gender == 'female') {
          this.profiles = [];
          this.profiles = this.dataService.allUser.filter(obj => obj.gender === 'male');
        }
        this.pNearBy = this.profiles.filter(ob => ob.city === user.city);
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
        // console.log(this.profiles);
      }, 600);
    }
  }

  liked(userA: string | undefined, id: String | undefined) {
    if (userA) {  
      this.dataService.getFormNeo().subscribe((value) => {
        let userOne = value.filter(ob => ob.email === userA);
        let key = localStorage.getItem('jwtToken');
        if (key) {
          const decode: JWT.JwtPayload = jwtDecode(key);
          let userTwo = value.filter(ob => ob.email === decode.sub);
          let userOneId: number | undefined = Number(userOne[0].id);
          let userTwoId: number | undefined = Number(userTwo[0].id)          
          if (userOneId >=0 && userTwoId) {
            let liked: number[] = [];
            liked.push(userTwoId);
            liked.push(userOneId);
            this.dataService.likeProfile(liked).subscribe((response: any) => {
               this._snackBar.open('Profile Liked!!', 'success', {
                duration: 5000,
                panelClass: ['mat-primary', 'mat-warn'],
               });
            const main = document.getElementById( id + '-card');
            main?.style.setProperty('transform', 'translateX(1500px)');
              main?.style.setProperty('opacity', '0');
              this.dataService.likes.push(userOne[0]);
            setTimeout(() => {
              main?.style.setProperty('display', 'none');
              this.profiles = this.profiles.filter(obj => obj.email !== userA);
            }, 600); 
            }, (error) => {
              console.log(error);
              console.log("high");
            })
          }
        }
      })
     }
  }
}

