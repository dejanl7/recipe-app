import { Routes, RouterModule } from "@angular/router";

// Components and services
import { EditRecipeComponent } from "./edit-recipe.component";
import { AddNewRecipeComponent } from "../add-new-recipe/add-new-recipe.component";


const EDIT_RECIPE_ROUTES: Routes = [
    { path: '', component: EditRecipeComponent },
    { path: ':id', loadChildren: './recipe-details/recipeDetails.module#RecipeDetailsModule' },
];


export const EditRecipesRouter = RouterModule.forChild(EDIT_RECIPE_ROUTES);