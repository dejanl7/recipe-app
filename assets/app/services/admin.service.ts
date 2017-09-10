import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";
import { ErrorService } from './error.service';

@Injectable()


export class AdminService {
    userId: string;
    userToken: string;
    selectedCategory = new Subject();
    adminUrlAddress: string = 'http://localhost:3000/admin/';
    
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


    // Get Admin Info
    getAdminInfo() {
        return this.http.get(this.adminUrlAddress)
        .flatMap((response: Response) => {
            return response.json().obj;
        })
        .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

}
