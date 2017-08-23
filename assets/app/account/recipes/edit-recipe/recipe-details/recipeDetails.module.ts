import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components and modules
import { Ng2CompleterModule } from "ng2-completer";
import { RecipeDetailsComponent } from "./recipe-details.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { CategoriesComponent } from "./categories/categories.component";
import { AttachedImgComponent } from "./attached-img/attached-img.component";
import { PaginationModule } from "../../../../shared/pagination.module";
import { RecipeDetailsRouter } from "./recipeDetails.routing";

// Services
import { RecipesService } from "../../../../services/recipes.service";


@NgModule({
    declarations: [
        RecipeDetailsComponent,
        GalleryComponent,
        CategoriesComponent,
        AttachedImgComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        RecipeDetailsRouter,
        PaginationModule
    ],
    providers: [
        RecipesService
    ]
})


export class RecipeDetailsModule { }
