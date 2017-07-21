import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()


export class UserVerificationService {
    urlAddress: string = 'http://localhost:3000/user/';


    constructor(private http: Http) { }


    /*===========================
        Services
    =============================*/
    // Get User Id (and info)
    getVerUserInfo(userId) {
      return this.http.get(this.urlAddress + userId)
        .map((response: Response) => {
            return response.json().obj;
        })
        .catch((error: Response) => {
            return Observable.throw(error.json());
        });
    }
    
    // Update User
    updateVerificatonStatus(userId){
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        return this.http.patch(this.urlAddress + userId, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

}
