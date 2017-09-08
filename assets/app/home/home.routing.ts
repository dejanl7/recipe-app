import { Routes, RouterModule } from "@angular/router";

// Components and services
import { HomeComponent } from "./home.component";


const HOME_ROUTES: Routes = [
    { path: '', component: HomeComponent },
];


export const HomeRouting = RouterModule.forChild(HOME_ROUTES);