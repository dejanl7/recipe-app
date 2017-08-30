import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CompleterData, CompleterService } from "ng2-completer";
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../../../services/recipes.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
    @ViewChild('editCategoryForm') editCategoryForm: NgForm;
    protected searchStrEdit: string;
    protected dataServiceEdit: CompleterData;
    getCategoriesAutoSuggestEdit: Subscription;
    getRecipeInfoCategories: Subscription;
    currentCategoriesEdit: Array<string> = [];
    categoryNames: Array<string> = [];
    protected categoriesAutoSuggestEdit: Array<string> = [];
    recipeId: string;
    
    constructor( private completerService: CompleterService, private recipeService: RecipesService, private activatedRoute: ActivatedRoute ) {}


    // On init
    ngOnInit() {
        this.getCategoriesAutoSuggestEdit = this.recipeService.getRecipeCategories()
        .subscribe((r) => {
            this.categoriesAutoSuggestEdit.push(r.categoryName);
        });

        this.getRecipeInfoCategories = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeId = pathElements.id;
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.currentCategoriesEdit = result.recipeCategories;
                for ( var x=0; x<result.recipeCategories.length; x++ ) {
                    this.categoryNames.push(result.recipeCategories[x].categoryName);
                }
            });
        });
        
    }

    // On destroy
    ngOnDestroy() {
        this.getCategoriesAutoSuggestEdit.unsubscribe();
        this.getRecipeInfoCategories.unsubscribe();
    }


    /*======================
        Edit Category
    ========================*/
    onEditCategory( catForm: string ) {
        if (this.editCategoryForm.value.category === null) {
            this.editCategoryForm.reset();
            return;
        }
        else if (this.categoryNames.indexOf(this.editCategoryForm.value.category) > -1 ){
            this.editCategoryForm.reset();
            return;
        }
        else {
            this.currentCategoriesEdit.push(this.editCategoryForm.value);
            this.categoryNames.push(this.editCategoryForm.value.category);
            this.editCategoryForm.reset();
            this.recipeService.categories.next(this.categoryNames);
        }
    }

    /*=================================
        Remove category from array    
    ===================================*/
    removeCategoryEdit( index: number, categoryId: string ) {
        if( index !== -1 ){
            this.currentCategoriesEdit.splice(index, 1);
            this.categoryNames.splice(index, 1);
            this.recipeService.categories.next(this.categoryNames);
            
            if( categoryId ) {
                this.recipeService.categoryUpdate(categoryId, this.recipeId)
                .subscribe( (result) => {
                    console.log(result);
                });
            }
        }
        
    }

}
