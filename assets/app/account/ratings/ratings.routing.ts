import { Routes, RouterModule } from "@angular/router";

// Components and services
import { RatingsComponent } from "./ratings.component";



const RATING_ROUTES: Routes = [
    { path: '', component: RatingsComponent }
];




export const RatingsRouter = RouterModule.forChild(RATING_ROUTES);