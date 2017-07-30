import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()


export class UserService {
    userId: string;
    userToken: string;
    accountUrlAddress: string = 'http://localhost:3000/user/account/';

    
    constructor( private http: Http ) { 
        if( localStorage.getItem('token') !== null ) {
            this.userId    = localStorage.getItem('userId');
            this.userToken = localStorage.getItem('token');
        }
          else if( sessionStorage.getItem('token') !== null ) {
              this.userId    = sessionStorage.getItem('userId');
              this.userToken = sessionStorage.getItem('token');
          }
    }


    /*===========================
        Services
    =============================*/
    // Get User by id
    getUserAccountInfo() {
      const token = '?token=' + this.userToken; 
      if( this.userToken){
        return this.http.get(this.accountUrlAddress + this.userId + token)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
        }
    }

    // Get all emails (from users)
    getUserEmails() {
      return this.http.get(this.accountUrlAddress + 'emails')
        .map((response: Response) => {
            const userInfo  = response.json().obj;
            return userInfo;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }



}
