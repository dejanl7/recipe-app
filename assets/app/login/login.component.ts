import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/src/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

    constructor() { }

    ngOnInit() {}


    // On Submit Login Form
    onLogin(loginForm: NgForm) {
        console.log(loginForm);
    }
}
