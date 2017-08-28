import { Routes, RouterModule } from "@angular/router";

// Components and services
import { AddNewRecipeComponent } from "./add-new-recipe.component";
import { CanDeactivateGuard } from "../../../route-protected-services/can-deactivate-guard.service";


const ADD_NEW_RECIPE_ROUTES: Routes = [
    { path: '', component: AddNewRecipeComponent, canDeactivate: [CanDeactivateGuard] }
];


export const NewRecipesRouter = RouterModule.forChild(ADD_NEW_RECIPE_ROUTES);