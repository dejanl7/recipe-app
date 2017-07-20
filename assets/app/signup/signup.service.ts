import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { SignUpModel } from "./signup.model";

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
}
