import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components and modules
import { RecipeCategoriesComponent } from "./recipe-categories.component";
import { RecipeCategoryRouter } from "./recipeCategory.routing";
import { PaginationModule } from "../../../shared/pagination.module";
import { TimeAgoModule } from "../../../shared/timeago.module";

// Services
import { RecipesService } from "../../../services/recipes.service";

// Custom Filter Pipe - for recipe table
import { FilterRecipeArrayPipe } from "../../../filter-array.pipe";
import { OrderByPipe } from "../../../order-by.pipe";



@NgModule({
    declarations: [
        RecipeCategoriesComponent,
        // FilterRecipeArrayPipe,
        // OrderByPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        TimeAgoModule,
        RecipeCategoryRouter
    ],
    providers: [
        RecipesService
    ]
})


export class RecipeCategoryModule { }
