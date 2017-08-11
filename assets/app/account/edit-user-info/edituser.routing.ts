import { Routes, RouterModule } from "@angular/router";

// Components and services
import { EditUserInfoComponent } from "./edit-user-info.component";



const EDIT_USER_INFO_ROUTES: Routes = [
    { path: '', component: EditUserInfoComponent },
];




export const EditUserInfoRouting = RouterModule.forChild(EDIT_USER_INFO_ROUTES);