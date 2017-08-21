import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from "../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";
import {RatingModule} from "ngx-rating";


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})


export class EditRecipeComponent implements OnInit, OnDestroy {
    recipesSubscr: Subscription;
    recipesInfo: Array<any> = [];
    starsCount: number = 0;

    constructor( private recipeService: RecipesService ) { }

    // On Init
    ngOnInit() {
        this.recipesSubscr = this.recipeService.getRecipeInfo()
        .flatMap( result => result.userRecipes)
        .subscribe( (result) => {
            this.recipesInfo.push(result);
            console.log(this.recipesInfo);
        });
    }

    // On Destroy
    ngOnDestroy() {
        this.recipesSubscr.unsubscribe();
    }

}
