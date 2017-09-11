import { Routes, RouterModule } from "@angular/router";

// Components and services
import { LayoutComponent } from "./layout.component";
import { CanDeactivateGuard } from "../../route-protected-services/can-deactivate-guard.service";

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, canDeactivate: [CanDeactivateGuard] },
];


export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);