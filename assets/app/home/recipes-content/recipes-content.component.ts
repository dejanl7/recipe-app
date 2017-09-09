import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { CategoriesService } from "../../services/category.service";
import { Subscription } from "rxjs/Subscription";
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";


@Component({
  selector: 'app-recipes-content',
  templateUrl: './recipes-content.component.html',
  styleUrls: ['./recipes-content.component.css']
})

export class RecipesContentComponent implements OnInit, OnDestroy {
    allRecipesInfo: Subscription;
    allRecipesCount: Subscription;
    busy = new Subject();
    publishedRecipes: Array<any> = [];
    numberOfPublishedRecipes: number;
    lastId: string;
    scrollingEnd: boolean = false;

    constructor( private recipeService: RecipesService, private categoryService: CategoriesService ) { }

    // Init
    ngOnInit() {
        this.allRecipesCount = this.recipeService.countAllRecipes()
        .subscribe( (allRecipesCount) => {
            this.numberOfPublishedRecipes = allRecipesCount.length;
        });

        this.allRecipesInfo = this.recipeService.getLastId()
        .subscribe( (initialRecipeRecords) => {
            this.publishedRecipes = initialRecipeRecords;
            let lastIndex = _.last(initialRecipeRecords, '_id');
            this.lastId = lastIndex._id;
        });
    }

    // Destroy
    ngOnDestroy() {
        this.allRecipesCount.unsubscribe();
        this.allRecipesInfo.unsubscribe();
    }


    /*=========================
        On Scroll
    ===========================*/
    onScroll() {
        this.busy.next();
        this.recipeService.getScrollRecipes(this.lastId)
        .subscribe( (result) => {
            if( this.publishedRecipes.length < +this.numberOfPublishedRecipes ) {
                for ( let i=0; i<result.length; i++ ) {
                    this.publishedRecipes.push(result[i]);
                }
                this.lastId = _.last(result, '_id')._id;
            }
                else {
                    this.scrollingEnd = true;
                }
        });
    }
}
