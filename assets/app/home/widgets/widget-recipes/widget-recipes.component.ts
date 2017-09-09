import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../services/recipes.service";

@Component({
  selector: 'app-widget-recipes',
  templateUrl: './widget-recipes.component.html',
  styleUrls: ['./widget-recipes.component.css']
})


export class WidgetRecipesComponent implements OnInit, OnDestroy {
    recentRecipesInfo: Subscription;
    recentRecipes: Array<any>;
    
    constructor( private recipeService: RecipesService ) { }

    // Init
    ngOnInit() {
        this.recentRecipesInfo = this.recipeService.getRecipesForCategory()
        .subscribe( (result) => {
            this.recentRecipes = result;
        })
    }

    // Destroy
    ngOnDestroy() {
        this.recentRecipesInfo.unsubscribe();
    }
}
