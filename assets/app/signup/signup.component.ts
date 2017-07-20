import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { SignUpService } from "./signup.service";
import { SignUpModel } from "./signup.model";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
    signinForm: FormGroup;
    passwordValue: string;
    repeatPassValue: string;
    forbiddenEmails = [];
    forbiddenUsernames = [];
    getUsersData = function() {
        this.signupService.getUserInfo()
          .subscribe((userInfo: SignUpModel[]) => {
              for( let i=0; i<userInfo.length; i++) {
                  this.forbiddenEmails.push(userInfo[i].email);
                  this.forbiddenUsernames.push(userInfo[i].username);
              }
          });
    };


    constructor( private signupService: SignUpService) { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_À-ž \u0400-\u04ff.-]*$')]),
            'lastName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_À-ž \u0400-\u04ff.-]*$')]),
            'email': new FormControl(null, [Validators.required, Validators.email, this.forbiddenMails.bind(this)]),
            'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_À-ž\u0400-\u04ff.-]*$'), this.forbiddenUNames.bind(this)]),
            'pwd': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_À-ž\u0400-\u04ff.-]*$')]),
            'repeatpwd': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_À-ž\u0400-\u04ff.-]*$')]),
        });

        // Check email and username matches
        this.getUsersData();

        // Track form value changes
        this.signinForm.valueChanges.subscribe(
          data => {
              this.passwordValue = data.pwd;
              this.repeatPassValue = data.repeatpwd;
              if( this.passwordValue != this.repeatPassValue ){
                  this.signinForm.controls.repeatpwd.setErrors({'mismatch': true});
              }
          }
        );

    }

    // Sumbit Form
    onSubmit() {
        this.signupService.signup(this.signinForm.value)
        .subscribe(
            data => {
                localStorage.setItem('userId', data.userId);
            });
        
        this.signinForm.reset();
        return this.getUsersData();
    }  

    // Custom Validator
    forbiddenUNames(control: FormControl): {[s: string]: boolean} {
        if( this.forbiddenUsernames.indexOf(control.value) !== -1 ) {
            return { 'usernameIsForbidden': true };
        }
          return null;
    }
    forbiddenMails(control: FormControl): {[s: string]: boolean} {
        if( this.forbiddenEmails.indexOf(control.value) !== -1 ) {
            return { 'emailIsForbidden': true };
        }
          return null;
    }
    

}
