import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProfilesComponent } from "./profiles/profiles.component";
import { ShopComponent } from "./shop/shop.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UserVerificationComponent } from "./user-verification/user-verification.component";

import { RouteLoggedInService } from "./route-protected-services/protected-loggedout-route.service";
import { RouteLoggedOutService } from "./route-protected-services/protected-loggedin-route.service";





const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profiles', component: ProfilesComponent },
    { path: 'shop', component: ShopComponent, canActivate: [RouteLoggedInService] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, canActivate: [RouteLoggedOutService] },
    { path: 'user-verification/:id', component: UserVerificationComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);