import { Routes, RouterModule } from "@angular/router";

// Components and services
import { OrdersComponent } from "./orders.component";



const ORDER_ROUTES: Routes = [
    { path: '', component: OrdersComponent },
];




export const OrderRouting = RouterModule.forChild(ORDER_ROUTES);