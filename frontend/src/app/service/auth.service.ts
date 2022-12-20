import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginService:LoginService, private router: Router, private _snackBar:MatSnackBar) { }

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
      (response: any) => {
        if (response.token === null || response.token === undefined || response.token === '') {
          this._snackBar.open('Invalid Credential!!', 'FAILED', {
          duration: 5000,
          panelClass: ['mat-primary', 'mat-warn'],});
        } else {
          this.setToken(response.token);
          this.router.navigate(['/home']);
        }  
      },
      (error:any) => {
        alert(error.error.message);
      })
  }
}
