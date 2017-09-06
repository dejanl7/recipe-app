import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { UserInfoModel } from "../models/userInfo.model";
import { ErrorService } from "./error.service";

@Injectable()


export class UserService {
    userId: string;
    userToken: string;
    accountUrlAddress: string = 'http://localhost:3000/user/account/';

    
    constructor( private http: Http, private errorService: ErrorService ) { 
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
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        }
    }

    // Get profile image
    getProfileImageAndEmail() {
        const token = '?token=' + this.userToken; 
        if( this.userToken){
            return this.http.get(this.accountUrlAddress + 'profile-image/' + this.userId + token)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
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
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Update User Information
    updateUserInfo(userInfoContent: UserInfoModel) {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const body      = JSON.stringify(userInfoContent);
        const token     = '?token=' + this.userToken; 
        return this.http.patch(this.accountUrlAddress + this.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Grant Creator role to viewer - make creator from viewer
    grantCreatorRole() {
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const token     = '?token=' + this.userToken; 
        return this.http.patch(this.accountUrlAddress + 'grant-creator-role/' + this.userId + token, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}
