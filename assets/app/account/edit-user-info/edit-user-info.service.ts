import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()


export class EditUserInfoService {
    accountUrlAddress: string = 'http://localhost:3000/user/account/';

    
    constructor( private http: Http ) { }


    /*===========================
        Services
    =============================*/
    // Get User by id
    getUserAccountInfo(userId, myToken) {
      const token = '?token=' + myToken; 
      return this.http.get(this.accountUrlAddress + userId + token)
        .map((response: Response) => {
            return response.json().obj;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }



}
