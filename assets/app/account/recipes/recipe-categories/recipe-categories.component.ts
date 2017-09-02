import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../services/recipes.service";
import { TooltipModule } from "ngx-tooltip";
import { CategoryModel } from "../../../models/categories.model";
import { CategoriesService } from "../../../services/category.service";
import { NgRedux, select } from "ng2-redux";

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.css']
})

export class RecipeCategoriesComponent implements OnInit, OnDestroy {
    allCategoriesSubscr: Subscription;
    isCategorySelected: boolean = true;
    allCategories: Array<string> = [];
    activeClass: boolean = true;
    choosedCat: Object;
    @select() catName;
    @select() catId;
    @select() remainCategoryCount;

    constructor( private recipeService: RecipesService, private categoryService: CategoriesService ) {}

    // Initialization
    ngOnInit() {
        this.allCategoriesSubscr = this.recipeService.getRecipeCategories()
        .subscribe( (categories) => {
            this.allCategories.push(categories);
        });

    }

    // On Destroy
    ngOnDestroy() {
        this.allCategoriesSubscr.unsubscribe();
    }


    /*==============================
        Active/deactive class
    ================================*/
    onActive(category: Object) {     
        this.choosedCat = category;
    }


}
