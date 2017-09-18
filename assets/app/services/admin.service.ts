import { Http, Response, Headers, RequestOptions } from '@angular/http';
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

    // Update Widget Positions and Widget(s) Display
    updateWidgets(widgetPositions: Array<string>, homePageLayout: any) {
        const token          = '?token=' + this.userToken;
        const data           = {
            'widgetPosition': widgetPositions,
            'homePageLayout': homePageLayout
        };
        const body      = JSON.stringify(data);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.adminUrlAddress + 'manage/' + this.userId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }





    // Only for testing PROXY Server
    // proxyGet(proxy: number) {
    //     const token = '?token=' + this.userToken;
    //     return this.http.get('http://localhost:3001/proxy' + token)
    //     .map((response: Response) => {
    //         console.log(response.json().obj);
    //         return response.json().obj;
    //     })
    //     .catch((error: Response) => {
    //         console.log(error.json());
    //         this.errorService.handleError(error.json());
    //         return Observable.throw(error.json());
    //     });
    // }
}
