import { Routes, RouterModule } from "@angular/router";

// Components and services
import { NotFoundComponent } from "./not-found.component";


const NOT_FOUND_ROUTES: Routes = [
    { path: '', component: NotFoundComponent },
];


export const NotFoundRouter = RouterModule.forChild(NOT_FOUND_ROUTES);