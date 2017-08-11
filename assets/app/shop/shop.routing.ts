import { Routes, RouterModule } from "@angular/router";

// Components and services
import { ShopComponent } from "./shop.component";



const SHOP_ROUTES: Routes = [
    { path: '', component: ShopComponent },
];




export const ShopRouter = RouterModule.forChild(SHOP_ROUTES);