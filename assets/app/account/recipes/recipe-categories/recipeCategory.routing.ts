import { Routes, RouterModule } from "@angular/router";
import { RecipeCategoriesComponent } from "./recipe-categories.component";
import { CategoryDetailsComponent } from "./category-details/category-details.component";

// Components and services


const RECIPE_CATEGORY_ROUTES: Routes = [
    { path: '', component: RecipeCategoriesComponent, children: [
        { path: ':id', component: CategoryDetailsComponent }
    ]}
];


export const RecipeCategoryRouter = RouterModule.forChild(RECIPE_CATEGORY_ROUTES);