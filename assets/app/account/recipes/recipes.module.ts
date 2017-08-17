import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// Components and modules
import { RecipesComponent } from "./recipes.component";
import { RecipesRouter } from "./recipes.routing";
import { AddNewRecipeComponent } from "./add-new-recipe/add-new-recipe.component";


@NgModule({
  declarations: [
      RecipesComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      RecipesRouter
  ]
})


export class RecipesModule { }
