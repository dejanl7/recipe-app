import { Routes, RouterModule } from "@angular/router";

// Components and services
import { AddNewRecipeComponent } from "./add-new-recipe.component";


const ADD_NEW_RECIPE_ROUTES: Routes = [
    { path: '', component: AddNewRecipeComponent }
];


export const NewRecipesRouter = RouterModule.forChild(ADD_NEW_RECIPE_ROUTES);