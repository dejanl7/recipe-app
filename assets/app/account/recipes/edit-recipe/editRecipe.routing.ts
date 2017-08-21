import { Routes, RouterModule } from "@angular/router";

// Components and services
import { EditRecipeComponent } from "./edit-recipe.component";


const EDIT_RECIPE_ROUTES: Routes = [
    { path: '', component: EditRecipeComponent }
];


export const EditRecipesRouter = RouterModule.forChild(EDIT_RECIPE_ROUTES);