import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService:LoginService) { }

  isLogged: boolean = false;

  validateUser(user: User) {
    this.loginService.get(user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      })
  }
}
