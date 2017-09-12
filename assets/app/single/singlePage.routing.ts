import { Routes, RouterModule } from "@angular/router";

// Components and services
import { SinglePageComponent } from "./single-page.component";


const SINGLE_PAGE_ROUTES: Routes = [
    { path: ':id', component: SinglePageComponent },
    { path: '**', redirectTo: '/not-found' },
];


export const SinglePageRouting = RouterModule.forChild(SINGLE_PAGE_ROUTES);