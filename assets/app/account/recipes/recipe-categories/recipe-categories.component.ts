import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../services/recipes.service";
import { TooltipModule } from "ngx-tooltip";

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.css']
})

export class RecipeCategoriesComponent implements OnInit, OnDestroy {
    allCategoriesSubscr: Subscription;
    allCategories: Array<string> = [];
    activeClass: boolean = false;
    selectedCategory: string;

    constructor( private categoryService: RecipesService ) {}

    // Initialization
    ngOnInit() {
        this.allCategoriesSubscr = this.categoryService.getRecipeCategories()
        .subscribe( (categories) => {
            this.allCategories.push(categories);
        });
    }

    // On Destroy
    ngOnDestroy() {
        this.allCategoriesSubscr.unsubscribe();
    }


    /*===========================
        Active/deactive class
    =============================*/
    onActive(category) {
        this.selectedCategory = category;
    }


}
