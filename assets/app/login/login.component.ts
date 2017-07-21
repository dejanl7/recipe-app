import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";
import { Router } from "@angular/router";

import { SignUpModel } from "../signup/signup.model";
import { LoginService } from "./login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

    constructor(private loginService: LoginService, private router: Router) { }


    // On Submit Login Form
    onLogin(loginForm: NgForm) {
        const user = new SignUpModel(loginForm.value.username, null, null, null, loginForm.value.password, loginForm.value.remember);
        this.loginService.login(user)
            .subscribe(
                data => {
                    if(user.remember){
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        this.router.navigateByUrl('/');
                    }
                    else {
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('userId', data.userId);
                        this.router.navigateByUrl('/profiles');
                    }
                },  
                error => console.error(error)
            )
    }
}
