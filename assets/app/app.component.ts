import { Component, OnInit } from '@angular/core';
import { LoginService } from "./login/login.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    
    constructor( private loginService: LoginService ){}


    ngOnInit() {}


    isUserLoggedIn() {
        if( this.loginService.isLoogedIn() ) {
            return true;
        } 
    }
}