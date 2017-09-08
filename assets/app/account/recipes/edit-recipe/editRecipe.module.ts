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
import { CustomPipesModule } from "../../../shared/custom-pipes.module";

// Services
import { RecipesService } from "../../../services/recipes.service";

// Custom Filter Pipe - for recipe table
import { OrderByPipe } from "../../../order-by.pipe";


@NgModule({
    declarations: [
        EditRecipeComponent
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
        CustomPipesModule
    ],
    providers: [
        RecipesService
    ]
})


export class EditRecipeModule { }
