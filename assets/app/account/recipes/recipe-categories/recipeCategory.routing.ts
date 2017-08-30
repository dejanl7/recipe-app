import { Routes, RouterModule } from "@angular/router";
import { RecipeCategoriesComponent } from "./recipe-categories.component";

// Components and services


const RECIPE_CATEGORY_ROUTES: Routes = [
    { path: '', component: RecipeCategoriesComponent }
];


export const RecipeCategoryRouter = RouterModule.forChild(RECIPE_CATEGORY_ROUTES);