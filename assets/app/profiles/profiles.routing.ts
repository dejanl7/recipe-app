import { Routes, RouterModule } from "@angular/router";

// Components and services
import { ProfilesComponent } from "./profiles.component";


const PROFILES_ROUTES: Routes = [
    { path: '', component: ProfilesComponent },
];


export const ProfilesRouting = RouterModule.forChild(PROFILES_ROUTES);