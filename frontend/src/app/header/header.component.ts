import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Profile } from '../model/profile.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
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
  
  
  getLikes() {
    setInterval(() => {
      this.likes = this.dataService.likes;
    }, 500)
  }
  
}
