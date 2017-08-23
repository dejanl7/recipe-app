import { Routes, RouterModule } from "@angular/router";

// Components and services
import { RecipeDetailsComponent } from "./recipe-details.component";


const RECIPE_DETAILS_ROUTES: Routes = [
    { path: '', component: RecipeDetailsComponent },
];


export const RecipeDetailsRouter = RouterModule.forChild(RECIPE_DETAILS_ROUTES);