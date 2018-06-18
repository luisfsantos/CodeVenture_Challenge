import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "hn-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions;
  name: string;
  loggedIn: boolean;

  constructor(private auth: AuthService) {
    this.subscriptions = this.auth.loggedIn.subscribe(loggedIn => {
      this.loggedIn = this.auth.isLoggedIn;
      this.name = this.auth.userName;
    });
  }

  ngOnInit() {
    this.loggedIn = this.auth.isLoggedIn;
    this.name = this.auth.userName;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
