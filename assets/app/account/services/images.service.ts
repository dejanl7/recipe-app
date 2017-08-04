import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../../errors/error.service";

@Injectable()


export class ImagesService {
    userId: string;
    userToken: string;
    imagesUrlAddress: string = 'http://localhost:3000/image';


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


    /*========================
        Services
    ==========================*/
    // Get All Images from specific user
    getUserImages() {
        const token = '?token=' + this.userToken; 
        if( this.userToken){
            return this.http.get(this.imagesUrlAddress + '/' + this.userId + token)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        }
    }

}
