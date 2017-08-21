import { Routes, RouterModule } from "@angular/router";
import { AddNewRecipeComponent } from "./add-new-recipe/add-new-recipe.component";


const ADD_NEW_RECIPE_ROUTES: Routes = [
    { path: 'new', loadChildren: './add-new-recipe/addNewRecipe.module#NewRecipeModule' },
    { path: 'edit', loadChildren: './edit-recipe/EditRecipe.module#EditRecipeModule' },
];


export const RecipesRouter = RouterModule.forChild(ADD_NEW_RECIPE_ROUTES);