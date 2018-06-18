import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}

  get isLoggedIn() {
    if (this.hasToken()) {
      try {
        var token = this.getToken();
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
      } catch (err) {
        return false;
      }
    }
    return false;
  }

  get userName() {
    if (this.hasToken()) {
      try {
        var token = this.getToken();
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken.name;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  login(access_token: string) {
    localStorage.setItem("access_token", access_token);
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.setItem("access_token", "");
    this.loggedIn.next(false);
  }

  private getToken() {
    var token = localStorage.getItem("access_token");
    if (this.hasToken) {
      return token;
    } else {
      return "";
    }
  }

  private hasToken() {
    return (
      localStorage.hasOwnProperty("access_token") &&
      localStorage.getItem("access_token") != null
    );
  }
}
