import { Routes, RouterModule } from "@angular/router";

// Components and services
import { EditUserInfoComponent } from "./edit-user-info.component";
import { CanDeactivateGuard } from "../../route-protected-services/can-deactivate-guard.service";

const EDIT_USER_INFO_ROUTES: Routes = [
    { path: '', component: EditUserInfoComponent, canDeactivate: [CanDeactivateGuard] },
];


export const EditUserInfoRouting = RouterModule.forChild(EDIT_USER_INFO_ROUTES);