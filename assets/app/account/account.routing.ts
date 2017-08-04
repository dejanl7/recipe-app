import { Routes, RouterModule } from "@angular/router";

// Components and services
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';

import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";


const ACCOUNT_ROUTES: Routes = [
    { path: '', component: AccountComponent, canActivate: [RouteLoggedInService], children: [
        { path: '', component: EditUserInfoComponent },
        { path: 'media', loadChildren: './media/media.module#MediaModule' },
        { path: 'recipes', component: RecipesComponent },
        { path: 'comments', loadChildren: './comments/comments.module#CommentsModule' },
        { path: 'ratings', component: RatingsComponent },
        { path: 'orders', component: OrdersComponent },
    ] },
];


export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);