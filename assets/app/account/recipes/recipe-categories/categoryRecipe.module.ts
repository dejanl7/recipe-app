import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components and modules
import { RecipeCategoriesComponent } from "./recipe-categories.component";
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { RecipeCategoryRouter } from "./recipeCategory.routing";
import { PaginationModule } from "../../../shared/pagination.module";
import { TimeAgoModule } from "../../../shared/timeago.module";

// Services
import { RecipesService } from "../../../services/recipes.service";
import { CategoriesService } from "../../../services/category.service";

// Custom Filter Pipe - for recipe table
import { CustomPipesModule } from "../../../shared/custom-pipes.module";



@NgModule({
    declarations: [
        RecipeCategoriesComponent,
        CategoryDetailsComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule,
        TimeAgoModule,
        RecipeCategoryRouter,
        CustomPipesModule
    ],
    providers: [
        RecipesService,
        CategoriesService
    ]
})


export class RecipeCategoryModule { }
