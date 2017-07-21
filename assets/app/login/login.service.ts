import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { SignUpModel } from "../signup/signup.model";

@Injectable()


export class LoginService {

    constructor(private http: Http) { }
        
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
                  return Observable.throw(error.json());
              });
      }
    
    // Logout
      logout() {
          if( localStorage.getItem('token') !== null ){
              localStorage.clear();
          }
          else {
              sessionStorage.clear();
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