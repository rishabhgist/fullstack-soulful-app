import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  post(customer: Customer) {
    return this.http.post('http://localhost:8082/api/v2/post', customer);
  }
}
