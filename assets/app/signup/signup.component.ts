import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    signinForm: FormGroup;
    forbiddenUsernames = ['Chris', 'Anna'];
    passwordValue: string;
    repeatPassValue: string;

    constructor() { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
            'lastName': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_.-]*$'), this.forbiddenNames.bind(this)]),
            'pwd': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
            'repeatpwd': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-zA-Z0-9_.-]*$')]),
            'remember': new FormControl(false)
        });

        // Track form value changes
        this.signinForm.valueChanges.subscribe(
          data => {
              this.passwordValue = data.pwd;
              this.repeatPassValue = data.repeatpwd;
              if( this.passwordValue == this.repeatPassValue ){
                console.log('Jednake su!');
              }
                else {
                    this.signinForm.controls.repeatpwd.setErrors({'mismatch': true});
                    console.log('Nisu jednake!');
                }
          }
        );
    }

    // Sumbit Form
    onSubmit() {
        console.log(this.signinForm);
    }

    // Custom Validator
    forbiddenNames(control: FormControl): {[s: string]: boolean} {
        if( this.forbiddenUsernames.indexOf(control.value) !== -1 ) {
            return { 'nameIsForbidden': true };
        }
          return null;
    }
    

}
