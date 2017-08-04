import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { select } from "ng2-redux";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    responsiveMenu = false;    
    
    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {}

    // Logout
    onLogout() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }
    
    // Is user logged in
    isLogged() {
        return this.loginService.isLoogedIn();
    }

}
