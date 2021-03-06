import { Routes, RouterModule } from "@angular/router";

// Components and services
import { AccountComponent } from "./account.component";
import { RecipesComponent } from './recipes/recipes.component';

import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";
import { CanDeactivateGuard } from "../route-protected-services/can-deactivate-guard.service";


const ACCOUNT_ROUTES: Routes = [
    { path: '', component: AccountComponent, canActivate: [RouteLoggedInService], children: [
        { path: '', loadChildren: './edit-user-info/edituser.module#EditUserInfoModule' },
        { path: 'media', loadChildren: './media/media.module#MediaModule' },
        { path: 'layout', loadChildren: './layout/layout.module#LayoutModule' },
        { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
        { path: 'comments', loadChildren: './comments/comments.module#CommentsModule' },
        { path: 'ratings', loadChildren: './ratings/ratings.module#RatingsModule' },
        { path: 'orders', loadChildren: './orders/orders.module#OrdersModule'},
    ] },
];


export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);