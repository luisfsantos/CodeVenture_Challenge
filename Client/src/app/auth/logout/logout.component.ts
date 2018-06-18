import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  template: ""
})
export class LogoutComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.auth.logout();
    router.navigate(["home"]);
  }
}
