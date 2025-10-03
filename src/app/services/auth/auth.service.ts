import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IS_LOGIN, USER_DATA } from '../../endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLogin());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  setData(data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(USER_DATA, jsonData);
    localStorage.setItem(IS_LOGIN, 'true');
    this.isLoggedInSubject.next(true);  // Notify subscribers
  }

  getData() {
    const obj = localStorage.getItem(USER_DATA);
    return obj ? JSON.parse(obj) : null;
  }

  getDataWithKey(key: string) {
    return localStorage.getItem(key);
  }

  isLogin() {
    return localStorage.getItem(IS_LOGIN) === 'true';
  }

  clearData() {
    localStorage.clear();
    this.isLoggedInSubject.next(false);  // Notify subscribers
  }

  // Optional helper if you want to force emit current state
  emitLoginState() {
    this.isLoggedInSubject.next(this.isLogin());
  }
}
