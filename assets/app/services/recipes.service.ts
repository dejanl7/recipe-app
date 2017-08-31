import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "./error.service";
import { CategoryModel } from "../models/categories.model";
import { RecipeModel } from "../models/recipe.model";

@Injectable()


export class RecipesService {
    userId: string;
    userToken: string;
    recipesUrlAddress: string  = 'http://localhost:3000/recipe/';
    categoryUrlAddress: string = 'http://localhost:3000/category/';
    categories  = new Subject();
    attachedImg = new Subject();
    galleryImgs = new Subject();
    
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
    // Get recipes info
    getRecipeInfo() {
        const token = '?token=' + this.userToken; 
        if( this.userToken){
            return this.http.get(this.recipesUrlAddress + this.userId + token)
                .map((response: Response) => {
                    return response.json().obj;
                })
                .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                });
        }
    }

    // Get ONE recipe information
    getRecipeUnique(recipeId: string) {
        const token = '?token=' + this.userToken;
        return this.http.get(this.recipesUrlAddress + 'unique/' + recipeId + token)
            .map((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Add New Recipe
    addNewRecipe(recipeInfo: RecipeModel) {
        const token   = '?token=' + this.userToken;
        const body    = JSON.stringify(recipeInfo);
        const headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.post(this.recipesUrlAddress + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Get Recipe Categories 
    getRecipeCategories() {
        const token = '?token=' + this.userToken; 
        return this.http.get(this.categoryUrlAddress + token)
            .flatMap((response: Response) => {
                return response.json().obj;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Update Recipe Status (publish/unpublish)
    updateRecipePublish(recipeId: string, status: boolean){
        const token     = '?token=' + this.userToken;
        const body      = JSON.stringify(status);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.recipesUrlAddress + recipeId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Move to trash
    moveToTrash(recipeId: string, status: boolean){
        const token     = '?token=' + this.userToken;
        const body      = JSON.stringify(status);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.recipesUrlAddress + '/delete/' + recipeId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }); 
    }

    // Delete recipe
    deleteRecipe(recipeId: string){
        const token = '?token=' + this.userToken;
        let body    = JSON.stringify({ "content": recipeId });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({
            headers: headers,
            body: body
        });
        
        return this.http.delete(this.recipesUrlAddress + '/delete/' + recipeId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Remove recipe from category (pull recipe)
    categoryUpdate(categId: string, recipeId: string) {
        const token     = '?token=' + this.userToken;
        const body      = JSON.stringify(recipeId);
        let headers     = new Headers({ 'Content-Type': 'application/json' });
        let options     = new RequestOptions({
            headers: headers,
            body: body
        });
        return this.http.patch(this.categoryUrlAddress + 'delete-recipe-category/' + categId + token, options)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    // Update Recipe Information (title, content, categories, attachment and gallery)
    updateRecipe(recipeId: string, uniqueRecipeInfo: RecipeModel){
        const headers   = new Headers({ 'Content-Type': 'application/json' });
        const body      = JSON.stringify(uniqueRecipeInfo);
        const token     = '?token=' + this.userToken; 
        return this.http.patch(this.recipesUrlAddress + 'edit/' + recipeId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


}
