import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService:LoginService) { }

  ngOnInit(): void {

  }

  user = this.fb.group({
    email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ])],
    password: ['', Validators.required]
    
  })

  login(user: FormGroup) {
    let data: User = {
      email: user.get('email')?.value,
      password: user.get('password')?.value
    }

    this.loginService.get(data).pipe(tap((response: any) => {
      
    }))
  }
  
}
