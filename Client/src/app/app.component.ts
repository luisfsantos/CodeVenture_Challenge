import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'hn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name : string;

  constructor(private auth:AuthService) { 
    this.auth.username.subscribe(username => {
      this.name = username;
    });
  }

  ngOnInit () {
  }
  

}
