import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';
import jwtDecode, * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  likes: Profile[] = [];

  findUser() {
    const key = localStorage.getItem('jwtToken');
    if (key) {
      const decode: JWT.JwtPayload = jwtDecode(key);
      console.log(decode.sub);
    }
  }
  
}
