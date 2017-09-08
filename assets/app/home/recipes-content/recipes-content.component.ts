import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from "../../services/recipes.service";
import { CategoriesService } from "../../services/category.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-recipes-content',
  templateUrl: './recipes-content.component.html',
  styleUrls: ['./recipes-content.component.css']
})

export class RecipesContentComponent implements OnInit, OnDestroy {
    allRecipesInfo: Subscription;
    publishedRecipes: Array<any>;

    constructor( private recipeService: RecipesService, private categoryService: CategoriesService ) { }

    // Init
    ngOnInit() {
        this.allRecipesInfo = this.recipeService.getAllRecipes()
        .subscribe( (result) => {
            this.publishedRecipes = result;
            console.log(this.publishedRecipes);
        })
    }

    // Destroy
    ngOnDestroy() {
        this.allRecipesInfo.unsubscribe();
    }

}
