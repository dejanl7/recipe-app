import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { CompleterData, CompleterService } from "ng2-completer";
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../../../services/recipes.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
    @ViewChild('editCategoryForm') categoryForm: NgForm;
    protected searchStrEdit: string;
    protected dataServiceEdit: CompleterData;
    getCategoriesAutoSuggestEdit: Subscription;
    selectedCategoriesEdit: Array<string> = [];
    protected categoriesAutoSuggestEdit: Array<string> = [];
    
    
    constructor( private completerService: CompleterService, private recipeService: RecipesService ) {}


    // On init
    ngOnInit() {
        this.getCategoriesAutoSuggestEdit = this.recipeService.getRecipeCategories()
        .subscribe((r) => {
            this.categoriesAutoSuggestEdit.push(r.categoryName);
        });
        
    }

    // On destroy
    ngOnDestroy() {
        this.getCategoriesAutoSuggestEdit.unsubscribe();
    }


    /*======================
        Add Category
    ========================*/
    onAddCategoryEdit( catForm: string ) {
        if ( this.categoryForm.value.category !== null ){
            this.selectedCategoriesEdit.push(this.categoryForm.value.category);
            this.categoryForm.reset();
            this.recipeService.categories.next(this.selectedCategoriesEdit);
        }
    }


    /*=================================
        Remove category from array    
    ===================================*/
    removeCategoryEdit( index: number ) {
        if( index !== -1 ){
            this.selectedCategoriesEdit.splice(index, 1);
            this.recipeService.categories.next(this.selectedCategoriesEdit);
        }
    }

}
