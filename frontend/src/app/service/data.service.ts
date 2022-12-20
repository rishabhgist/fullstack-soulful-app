import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';
import jwtDecode, * as JWT from 'jwt-decode';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  likes: Profile[] = [];

  data: Customer[] = [];

  findUser() {
    const key = localStorage.getItem('jwtToken');
    if (key) {
      const decode: JWT.JwtPayload = jwtDecode(key);
      this.http.get<Array<Customer>>('http://localhost:8082/api/v2/user').subscribe((value) => {
        let more: Customer = value.filter(obj => obj.email === decode.sub)[0];
        this.data.push(more)}) 
    }
  }
}