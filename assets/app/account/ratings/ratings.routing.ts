import { Routes, RouterModule } from "@angular/router";

// Components and services
import { RatingsComponent } from "./ratings.component";
import { TestComponent } from "../test/test.component";



const RATING_ROUTES: Routes = [
    { path: '', component: RatingsComponent },
    { path: 'test', component: TestComponent },
];




export const RatingsRouter = RouterModule.forChild(RATING_ROUTES);