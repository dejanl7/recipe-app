import { Routes, RouterModule } from '@angular/router';

// Components and services
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";
import { MediaComponent } from "./media/media.component";
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';

import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";


const ACCOUNT_ROUTES: Routes = [
    { path: 'account', component: AccountComponent, canActivate: [RouteLoggedInService], children: [
        { path: '', component: EditUserInfoComponent },
        { path: 'media', component: MediaComponent },
        { path: 'recipes', component: RecipesComponent },
        { path: 'comments', component: CommentsComponent },
        { path: 'ratings', component: RatingsComponent },
        { path: 'orders', component: OrdersComponent },
    ] },
];


export const AccountRouting = RouterModule.forChild(ACCOUNT_ROUTES);