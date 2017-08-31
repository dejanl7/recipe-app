import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryModel } from "../../../../models/categories.model";
import { CategoriesService } from "../../../../services/category.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent implements OnInit, OnDestroy {
    categorySubscr: Subscription;
    currentCatSubscr: Subscription;
    categoryInfo: Object;
    currentCategoryInfo: Object;
    categoryId: string;
    categoryName: string;

    constructor( private categoryService: CategoriesService, private activatedRoute: ActivatedRoute ) { }

    // Initialize
    ngOnInit() {
        this.categorySubscr = this.activatedRoute.params
        .subscribe( (rparams ) => {
            this.categoryId = rparams.id;
            this.categoryService.getCategoryInfo(rparams.id)
            .subscribe( (result) => {
                this.categoryInfo = result;
                this.categoryName = result.categoryName;
            });
        });
    }

    // Destroy
    ngOnDestroy() {
        this.categorySubscr.unsubscribe();
    }


    /*============================
        Save edited name
    ==============================*/
    updateCategoryTitle(categName: string) {
        this.categoryService.updateCategoryName(this.categoryId, categName)
        .subscribe( (result) => {
            // console.log(result);
        });
    }

    /*===============================
        Remove recipe from category  
    =================================*/
    removeRecipe(categoryId: string, recipeId: string) {
        this.categoryService.removeRecipeFromCategory(categoryId, recipeId)
        .subscribe( (removed) => {
            console.log(removed);
        });
    }
    

}
