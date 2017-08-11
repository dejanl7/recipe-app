import { Routes, RouterModule } from "@angular/router";

// Components and services
import { AccountComponent } from "./account.component";
import { RecipesComponent } from './recipes/recipes.component';

import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";
import { CanDeactivateGuard } from "../route-protected-services/can-deactivate-guard.service";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";


const ACCOUNT_ROUTES: Routes = [
    { path: '', component: AccountComponent, canActivate: [RouteLoggedInService], children: [
        //{ path: '', loadChildren: './edit-user-info/edituser.module#EditUserInfoModule', canDeactivate: [CanDeactivateGuard] },
        { path: '', component: EditUserInfoComponent, canDeactivate: [CanDeactivateGuard] },
        { path: 'media', loadChildren: './media/media.module#MediaModule' },
        { path: 'recipes', component: RecipesComponent },
        { path: 'comments', loadChildren: './comments/comments.module#CommentsModule' },
        { path: 'ratings', loadChildren: './ratings/ratings.module#RatingsModule' },
        { path: 'orders', loadChildren: './orders/orders.module#OrdersModule'},
    ] },
];


export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);