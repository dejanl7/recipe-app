import { Routes, RouterModule } from '@angular/router';

// Components and services
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";
import { MediaComponent } from "./media/media.component";
import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";
import { CommonModule } from "@angular/common";


const ACCOUNT_ROUTES: Routes = [
    { path: 'account', component: AccountComponent, canActivate: [RouteLoggedInService], children: [
        { path: '', component: MediaComponent },
        { path: ':id/edit', component: EditUserInfoComponent },
        { path: 'media', component: MediaComponent }
    ] },
];


export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);