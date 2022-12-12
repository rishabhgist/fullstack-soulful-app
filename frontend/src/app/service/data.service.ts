import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  likes: Profile[] = [];
  
}
