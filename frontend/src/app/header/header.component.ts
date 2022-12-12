import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    const menu = document.getElementById('dropdown');
    if (menu?.style.display === 'none') {
      menu.style.setProperty('display', 'flex')
    } else {
       menu?.style.setProperty('display', 'none')
    }
  }
}
