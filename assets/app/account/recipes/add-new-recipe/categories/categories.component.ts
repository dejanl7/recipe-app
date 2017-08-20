import { Component, OnInit, ViewChild } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { NgForm } from "@angular/forms";
import { RecipesService } from "../../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
    @ViewChild('newCategoryForm') categoryForm: NgForm;
    protected searchStr: string;
    protected captain: string;
    protected dataService: CompleterData;
    getCategoriesAutoSuggest: Subscription;
    selectedCategories: Array<string> = [];
    protected categoriesAutoSuggest: Array<string> = [];
    
    
    constructor( private completerService: CompleterService, private recipeService: RecipesService ) {}


    // On init
    ngOnInit() {
        this.getCategoriesAutoSuggest = this.recipeService.getRecipeCategories()
        .subscribe((r) => {
            this.categoriesAutoSuggest.push(r.categoryName);
            console.log(this.categoriesAutoSuggest);
        });
        
    }

    // On destroy
    ngOnDestroy() {
        this.getCategoriesAutoSuggest.unsubscribe();
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
