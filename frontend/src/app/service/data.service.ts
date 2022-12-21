import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
import { HttpClient } from '@angular/common/http';
import jwtDecode, * as JWT from 'jwt-decode';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  likes: Customer[] = [];

  data: Customer[] = [];

  allUser: Customer[] = [];
  
  getAll():Observable<Customer[]> {
    return this.http.get<Array<Customer>>('http://localhost:8082/api/v2/user');
  }
  
  getFormNeo():Observable<Customer[]> {
    return this.http.get<Array<Customer>>('http://localhost:8086/api/v3/find');
  }

  likeProfile(body: Array<Number>) {
    return this.http.post('http://localhost:8086/api/v3/like', body, {responseType: 'text'});
  }
  
  findUser() {
    const key = localStorage.getItem('jwtToken');
    if (key) {
      const decode: JWT.JwtPayload = jwtDecode(key);
      this.http.get<Array<Customer>>('http://localhost:8082/api/v2/user').subscribe((value) => {
        let more: Customer = value.filter(obj => obj.email === decode.sub)[0];
        this.data.push(more)}) 
    }
  }

  getAllUser() {
    const key = localStorage.getItem('jwtToken');
    if (key) {
      const decode: JWT.JwtPayload = jwtDecode(key);
      this.http.get<Array<Customer>>('http://localhost:8082/api/v2/user').subscribe((value) => {
        value.filter(obj => obj.email !== decode.sub).forEach(elemet => {
          this.allUser.push(elemet);
        })
      })
    }
  }
}