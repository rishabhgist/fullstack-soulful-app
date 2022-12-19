import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Profile } from '../model/profile.model';
import { AuthService } from '../service/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService:DataService, private authSerive: AuthService, private router:Router) { }

  ngOnInit(): void {
    // this.checklogin();
    this.getLikes();
  }

  toggleMenu() {
    const menu = document.getElementById('dropdown');
    if (menu?.style.display === 'none') {
      menu.style.setProperty('display', 'flex')
    } else {
       menu?.style.setProperty('display', 'none')
    }
  }

  likes: Profile[] = []
  
  public isUserLoggedIn() {
    return this.authSerive.isLoggedIn()
  }
  
  getLikes() {
    setInterval(() => {
      this.likes = this.dataService.likes;
    }, 500)
    
  }

  // checklogin() {
  //   if (this.isUserLoggedIn()) {
  //     this.router.navigate(['home']);
  //   }
  // }
  
  logout() {
    this.authSerive.clear();
    this.router.navigate(['/login']);
  }
}
