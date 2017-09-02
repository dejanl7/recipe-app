import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from 'rxjs';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "./error.service";
import { CategoryModel } from "../models/categories.model";
import { RecipeModel } from "../models/recipe.model";

@Injectable()


export class CategoriesService {
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
    
    // Get Category By Id - all category info
    getCategoryInfo(categoryId: string) {
        const token = '?token=' + this.userToken; 
        if( this.userToken){
            return this.http.get(this.categoryUrlAddress + categoryId + token)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
        }
    }
    // Update category name
    updateCategoryName(categoryId: string, categoryName: string) {
        const token     = '?token=' + this.userToken;
        const body      = JSON.stringify(categoryName);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.categoryUrlAddress + categoryId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    // Remove recipes from category
    removeRecipeFromCategory(categoryId: string, recipeId: string) {
        const token     = '?token=' + this.userToken;
        const body      = JSON.stringify(recipeId);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.categoryUrlAddress+ 'delete/' + categoryId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Delete category
    deleteCategory(categoryId: string, recipes: Array<any>){
        const token = '?token=' + this.userToken;
        let body    = JSON.stringify({ "content": recipes });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            headers: headers,
            body: body
        });
        
        return this.http.delete(this.categoryUrlAddress + categoryId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    



}
