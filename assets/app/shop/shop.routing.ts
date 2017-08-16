import { Routes, RouterModule } from "@angular/router";

// Components and services
import { ShopComponent } from "./shop.component";
import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";


const SHOP_ROUTES: Routes = [
    { path: '', component: ShopComponent, canActivate: [RouteLoggedInService] },
];


export const ShopRouter = RouterModule.forChild(SHOP_ROUTES);