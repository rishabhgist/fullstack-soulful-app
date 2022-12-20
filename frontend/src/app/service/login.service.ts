import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  requestHeader = new HttpHeaders(
    { "No-Auth" : "True"}
  )
  get(user: User) {
    return this.http.post('http://localhost:8085/login', user, {
      headers: this.requestHeader,
    });
  }
}
