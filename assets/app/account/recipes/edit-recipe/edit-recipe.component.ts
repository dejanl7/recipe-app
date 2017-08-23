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
    activeRecipesInfo: Array<any> = [];
    trashRecipesInfo: Array<any> = [];
    starsCount: number = 0;
    recipesPerPage: number = 5;
    currentRecipePage: number = 1;
    activeRecipes: boolean = true;
    trashRecipes: boolean = false;


    constructor( private recipeService: RecipesService ) { }

    // On Init
    ngOnInit() {
        this.recipesSubscr = this.recipeService.getRecipeInfo()
        .subscribe( (result) => {
            const recInfo = result.userRecipes;
            for ( var r=0; r<recInfo.length; r++ ) {
                if ( recInfo[r].recipePublish ) {
                    this.activeRecipesInfo.push(recInfo[r]);
                }
                else {
                    this.trashRecipesInfo.push(recInfo[r]);
                }
            }   
        });

        this.recipesInfo = this.activeRecipesInfo;
    }

    // On Destroy
    ngOnDestroy() {
        this.recipesSubscr.unsubscribe();
    }


    /*======================
        Current Page
    ========================*/
    recipePageChange(page: number) {
        this.currentRecipePage = page;
    }

    /*=========================
       Switch Active/Trash
    ===========================*/
    activeRecipeList() {
        this.activeRecipes = !this.activeRecipes;
        this.trashRecipes = !this.trashRecipes;
        this.currentRecipePage = 1;

        if( this.trashRecipes ) {
            this.recipesInfo = this.trashRecipesInfo;
        }
            else if( this.activeRecipes ) {
                this.recipesInfo = this.activeRecipesInfo;
            }
                else {
                    this.recipesInfo = this.activeRecipesInfo;
                }
        
    }


}
