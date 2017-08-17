import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// Components and modules
import { AddNewRecipeComponent } from "./add-new-recipe.component";
import { NewRecipesRouter } from "./addNewRecipe.routing";


@NgModule({
  declarations: [
      AddNewRecipeComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      NewRecipesRouter
  ]
})


export class NewRecipeModule { }
