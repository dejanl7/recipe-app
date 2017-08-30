import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";
import { ErrorService } from "./error.service";
import { CategoryModel } from "../models/categories.model";
import { RecipeModel } from "../models/recipe.model";

@Injectable()


export class RecipesService {
    userId: string;
    userToken: string;
    categoryUrlAddress: string = 'http://localhost:3000/category/';
    
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
    // Get Recipe Categories - Service for getting all categories is into "recipes.service.ts"
    
    



}
