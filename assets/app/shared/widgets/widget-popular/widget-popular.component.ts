import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-widget-popular',
  templateUrl: './widget-popular.component.html',
  styleUrls: ['./widget-popular.component.css']
})

export class WidgetPopularComponent implements OnInit, OnDestroy {
    recipesInfoSubscr: Subscription;
    popularRecipes: Array<any>;

    constructor( private recipeService: RecipesService ) { }

    // Initialization
    ngOnInit() {
        this.recipesInfoSubscr = this.recipeService.getPopularRecipes()
          .subscribe( (allRecipes) => {
              this.popularRecipes = allRecipes;
          });
    }

    // Destroy (leave)
    ngOnDestroy() {
        this.recipesInfoSubscr.unsubscribe();
    }
}
