import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { TooltipModule } from "ngx-tooltip";
import { CategoryModel } from "../../../models/categories.model";
import { CategoriesService } from "../../../services/category.service";
import { NgRedux, select } from "ng2-redux";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import * as _ from "lodash";

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.css']
})


export class RecipeCategoriesComponent implements OnInit, OnDestroy {
    recipeAuthorization: Subscription;
    allCategoriesSubscr: Subscription;
    choosecCatSubscr: Subscription;
    allCategories: Array<string> = [];
    choosedCat: any;
    url: string;
    @select() catName;
    @select() catId;
    @select() remainCategoryCount;
    @select() displayAllCategories;

    constructor( private userService: UserService, private categoryService: CategoriesService, private activatedRoute: ActivatedRoute, private router: Router ) {}

    // Initialization
    ngOnInit() {
        // Get all categories
        this.allCategoriesSubscr = this.categoryService.getCategories()
        .subscribe( (categories) => {
            this.allCategories = categories;
        });

        // Get all categories - redux display
        this.displayAllCategories
        .subscribe( (result) => {
            if ( result ) {
                this.allCategories = result;
            }
        });

        // Subscribe to get selected category
        this.choosecCatSubscr = this.categoryService.selectedCategory
        .subscribe( (selectedCat: any) => {
            this.choosedCat = selectedCat;
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

    // On Destroy
    ngOnDestroy() {
        this.allCategoriesSubscr.unsubscribe();
        this.choosecCatSubscr.unsubscribe();
    }


    /*==============================
        Active/deactive class
    ================================*/
    onActive(category: Object) {     
        this.choosedCat = category;
    }


}
