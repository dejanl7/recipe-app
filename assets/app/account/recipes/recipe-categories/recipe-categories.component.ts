import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
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
    allCategories: Array<string> = [];
    choosedCat: Object;
    @select() catName;
    @select() catId;
    @select() remainCategoryCount;
    @select() displayAllCategories;

    constructor( private categoryService: CategoriesService ) {}

    // Initialization
    ngOnInit() {
        this.allCategoriesSubscr = this.categoryService.getCategories()
        .subscribe( (categories) => {
            this.allCategories = categories;
        });

        this.displayAllCategories
        .subscribe( (result) => {
            if ( result ) {
                this.allCategories = result;
            }
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
