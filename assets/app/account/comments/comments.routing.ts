import { Routes, RouterModule } from "@angular/router";

// Components and services
import { CommentsComponent } from "./comments.component";



const PROFILES_ROUTES: Routes = [
    { path: '', component: CommentsComponent },
];




export const CommentsRouting = RouterModule.forChild(PROFILES_ROUTES);