import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { UserVerificationComponent } from "./user-verification/user-verification.component";

import { RouteLoggedOutService } from "./route-protected-services/protected-loggedin-route.service";



const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profiles', loadChildren: './profiles/profiles.module#ProfilesModule' },
    { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent, canActivate: [RouteLoggedOutService] },
    { path: 'user-verification/:id', component: UserVerificationComponent },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'not-found', loadChildren: './notfound/notFound.module#NotFoundModule' },
    { path: '**', redirectTo: '/not-found' },
];


@NgModule({
    imports: [ 
        RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ 
        RouterModule
    ]
})


export class AppRoutingModule {}