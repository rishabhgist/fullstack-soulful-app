import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService:LoginService, private router: Router) { }

  isLogged: boolean = false;

  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken() :string | null{
    return localStorage.getItem("jwtToken");
  }
  
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken() ? true : false;
  }

  validateUser(user: User) {
    this.loginService.get(user).subscribe(
      (response:any) => {
        this.setToken(response.token);
        this.router.navigate(['/home']);
        this.isLogged = true; 
      },
      (error:any) => {
        alert(error.error.message);
      })
  }
}
