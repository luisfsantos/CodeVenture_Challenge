import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-token',
  template: ''
})
export class TokenComponent implements OnInit {

  constructor(private _activeRoute:ActivatedRoute, private auth:AuthService, private router:Router) { 
    _activeRoute.fragment.subscribe(value => {
      var tokenPos = value.lastIndexOf("access_token=");
      if (tokenPos != -1) {
        var token = value.slice(tokenPos + "access_token=".length);
        auth.login(token);
      }
    });
    
  }

  ngOnInit() {
    this.router.navigate(['home']);
  }

}
