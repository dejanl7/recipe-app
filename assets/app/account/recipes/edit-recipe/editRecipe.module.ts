import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components and modules
import { Ng2CompleterModule } from "ng2-completer";
import { PaginationModule } from "../../../shared/pagination.module";
import { TimeAgoModule } from "../../../shared/timeago.module";
import { EditRecipesRouter } from "./editRecipe.routing";
import { EditRecipeComponent } from "./edit-recipe.component";
import { RatingModule } from "ngx-rating";
import { FilterRecipeModule } from "../../../shared/filter-array.module";

// Services
import { RecipesService } from "../../../services/recipes.service";

// Custom Filter Pipe - for recipe table
import { OrderByPipe } from "../../../order-by.pipe";


@NgModule({
    declarations: [
        EditRecipeComponent,
        OrderByPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        EditRecipesRouter,
        Ng2CompleterModule,
        PaginationModule,
        RatingModule,
        TimeAgoModule,
        FilterRecipeModule
    ],
    providers: [
        RecipesService
    ]
})


export class EditRecipeModule { }
