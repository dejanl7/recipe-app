import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryModel } from "../../../../models/categories.model";
import { CategoriesService } from "../../../../services/category.service";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeInfoInterface } from "../../../../redux/interfaces";
import { UPDATE_CATEGORY_NAME, ALL_CATEGORIES } from "../../../../redux/actions";
import { NgRedux } from "ng2-redux";
import { UpdatedInfoService } from "../../../../services/updatedinfo.service";


@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})

export class CategoryDetailsComponent implements OnInit, OnDestroy {
    categorySubscr: Subscription;
    currentCatSubscr: Subscription;
    categoryInfo: any;
    currentCategoryInfo: Object;
    categoryId: string;
    categoryName: string;

    constructor( private categoryService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute, private ngRedux: NgRedux<RecipeInfoInterface>, private updateInfo: UpdatedInfoService ) { }

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
        .subscribe( (result: Object) => {
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Recipe name is updated...');
            this.ngRedux.dispatch({ type: UPDATE_CATEGORY_NAME, catNamePayload: categName, catIdPayload: this.categoryId, countRemainRecordsPayload: this.categoryInfo.categoryRecipe.length });
        });
        
        this.updateInfo.isUpdated.next(false);
    }

    /*===============================
        Remove recipe from category  
    =================================*/
    removeRecipe(categoryId: string, recipeId: string, categoryName: string) {
        if( confirm('Do you want to remove recipe from category?') ){
            this.categoryService.removeRecipeFromCategory(categoryId, recipeId)
            .subscribe( (removed) => {
                this.updateInfo.isUpdated.next(true);
                this.updateInfo.updatedInfoMessage.next('Removed recipe from category...');
                this.activatedRoute.params
                .subscribe( (rparams ) => {
                    this.categoryId = rparams.id;
                    this.categoryService.getCategoryInfo(rparams.id)
                    .subscribe( (result) => {
                        this.categoryInfo = result;
                        this.categoryName = result.categoryName;
                        this.ngRedux.dispatch({ type: UPDATE_CATEGORY_NAME, catNamePayload: categoryName, catIdPayload: this.categoryId, countRemainRecordsPayload: this.categoryInfo.categoryRecipe.length });
                    });
                });
            });
            this.updateInfo.isUpdated.next(false);
        }
    }

    /*========================================
        Delete Category and related recipes
    ==========================================*/
    deleteCategory(categoryId: string, recipesInCategory: Array<string>) {
        if( confirm('Do you want to delete this category?') ){
            this.categoryService.deleteCategory(categoryId, recipesInCategory)
            .subscribe( (result) => {
                this.categoryService.getCategories()
                .subscribe( (allCategories: Array<any>) => {
                    this.ngRedux.dispatch({ type: ALL_CATEGORIES, categoriesPayload: allCategories });
                    this.router.navigate(['../account/recipes/categories']);
                });
            });
        }
    }    

}
