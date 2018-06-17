import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() { }

  get isLoggedIn() {
    if (this.hasToken()) {
      var token = this.getToken();
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(token);
    }
    return false;
    
  }

  get userName() {
    if (this.hasToken()) {
      var token = this.getToken();
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      return decodedToken.name;
    }
    return null;
  }

  login(access_token:string) {
    localStorage.setItem("access_token", access_token);
    this.username.next(this.userName);
  }

  logout() {
    localStorage.setItem("access_token", '');
  }

  private getToken() {
    var token = localStorage.getItem("access_token");
    if (this.hasToken) {
      return token;
    } else {
      return '';
    }
  }

  private hasToken() {
    return localStorage.hasOwnProperty("access_token") && localStorage.getItem("access_token") != null;
  }
}
