import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components and modules
import { AddNewRecipeComponent } from "./add-new-recipe.component";
import { NewRecipesRouter } from "./addNewRecipe.routing";
import { CategoriesComponent } from './categories/categories.component';
import { Ng2CompleterModule } from "ng2-completer";
import { AttachedImageComponent } from './attached-image/attached-image.component';
import { PaginationModule } from "../../../shared/pagination.module";

// Services
import { RecipesService } from "../../../services/recipes.service";
import { RecipeGalleryComponent } from './recipe-gallery/recipe-gallery.component';


@NgModule({
    declarations: [
        AddNewRecipeComponent,
        CategoriesComponent,
        AttachedImageComponent,
        RecipeGalleryComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        NewRecipesRouter,
        FormsModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        PaginationModule
    ],
    providers: [
        RecipesService
    ]
})


export class NewRecipeModule { }
