import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";
import { ErrorService } from "./error.service";
import { CategoryModel } from "../models/categories.model";

@Injectable()


export class RecipesService {
    userId: string;
    userToken: string;
    recipesUrlAddress: string = 'http://localhost:3000/recipes/';
    categories = new Subject();
    attachedImg = new Subject();
    
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
    
   



}
