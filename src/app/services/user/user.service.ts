import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  register(data: any){
    localStorage.setItem('userData', JSON.stringify(data));
    return of({
      success: true,
      data: data,
      message: 'User registered successfully',
    });
  }

  login(data: any){
    localStorage.setItem('userData', JSON.stringify(data));
    return of({
      success: true,
      data: data,
      message: 'User loggedIn',
    });
  }
}
