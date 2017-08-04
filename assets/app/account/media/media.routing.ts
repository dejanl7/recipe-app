import { Routes, RouterModule } from "@angular/router";

// Components and services
import { MediaComponent } from "./media.component";
import { RouteLoggedInService } from "../../route-protected-services/protected-loggedout-route.service";
import { NewImagesComponent } from "./new-images/new-images.component";
import { AllImagesComponent } from "./all-images/all-images.component";




const MEDIA_ROUTES: Routes = [
    { path: '', component: MediaComponent, canActivate: [RouteLoggedInService] }
];


export const MediaRouting = RouterModule.forChild(MEDIA_ROUTES);