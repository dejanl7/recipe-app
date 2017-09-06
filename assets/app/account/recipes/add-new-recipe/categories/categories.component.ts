import { Component, OnInit, ViewChild } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { NgForm } from "@angular/forms";
import { RecipesService } from "../../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../../../../services/user.service";
import { Router } from "@angular/router";
import * as _ from "lodash";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
    recipeAuthorization: Subscription;
    @ViewChild('newCategoryForm') categoryForm: NgForm;
    protected searchStr: string;
    protected dataService: CompleterData;
    getCategoriesAutoSuggest: Subscription;
    selectedCategories: Array<string> = [];
    protected categoriesAutoSuggest: Array<string> = [];
    
    
    constructor( private userService: UserService, private completerService: CompleterService, private recipeService: RecipesService, private router: Router ) {}


    // On init
    ngOnInit() {
        this.getCategoriesAutoSuggest = this.recipeService.getRecipeCategories()
        .subscribe((r) => {
            this.categoriesAutoSuggest.push(r.categoryName);
        });
        
        // Get user roles
        this.recipeAuthorization = this.userService.getUserAccountInfo()
         .subscribe( (user) => {
             var canManage = _.find(user.userRole.roles, { 'canManageRecipe': true });
             if ( !canManage ) {
                 this.router.navigate(['/']);
             }
        });
    }

    // On destroy
    ngOnDestroy() {
        this.getCategoriesAutoSuggest.unsubscribe();
        this.recipeAuthorization.unsubscribe();
    }


    /*======================
        Add Category
    ========================*/
    onAddCategory( catForm: string ) {
        if ( this.categoryForm.value.category !== null ){
            this.selectedCategories.push(this.categoryForm.value.category);
            this.categoryForm.reset();
            this.recipeService.categories.next(this.selectedCategories);
        }
    }


    /*=================================
        Remove category from array    
    ===================================*/
    removeCategory( index: number ) {
        if( index !== -1 ){
            this.selectedCategories.splice(index, 1);
            this.recipeService.categories.next(this.selectedCategories);
        }
    }

}
