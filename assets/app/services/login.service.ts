import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ErrorService } from "./error.service";
import { SignUpModel } from "../models/signup.model";

@Injectable()


export class LoginService {

    constructor(private http: Http, private errorService: ErrorService) { }

        
    /*===========================
        Services
    =============================*/
    // Login User
    login(user: SignUpModel) {
          const body    = JSON.stringify(user);
          const headers = new Headers({'Content-Type': 'application/json'});

          return this.http.post('http://localhost:3000/user/login', body, {headers: headers})
              .map((response: Response) => response.json())
              .catch((error: Response) => {
                  this.errorService.handleError(error.json());
                  return Observable.throw(error.json());
              });
      }
    
    // Logout
    logout() {
          if( localStorage.getItem('token') !== null ){
            localStorage.clear();     
            location.reload();
          }
          else {
            sessionStorage.clear();
            window.location.reload();   
            location.reload();
          }
    }
    
    // Check if user is login
    isLoogedIn() {
        if( localStorage.getItem('token') !== null ) {
            return localStorage.getItem('token') !== null;
        }
          else if( sessionStorage.getItem('token') !== null ) {
              return sessionStorage.getItem('token') !== null;
          }
    }
    

}
