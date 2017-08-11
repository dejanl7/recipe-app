import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()

export class SignUpService {

    constructor(private http: Http) {}

    /*===========================
        Services
    =============================*/
    // Get User Info
    getUserInfo() {
      return this.http.get('http://localhost:3000/user/signin')
        .map((response: Response) => {
            const userInfo  = response.json().obj;
            return userInfo;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }
    
    // Add New User (Sign In)
    signup(user) {
        const body    = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }



}