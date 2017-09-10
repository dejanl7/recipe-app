import { Routes, RouterModule } from "@angular/router";

// Components and services
import { LayoutComponent } from "./layout.component";

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent },
];


export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);