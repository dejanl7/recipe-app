// Angular 4 Basic Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Angular 4 Bootstrap

// Routes
import { AppRoutingModule } from "./app.routing";

// Components, Directives and Services
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
//import { ProfilesComponent } from './profiles/profiles.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorsComponent } from './errors/errors.component';
import { UserVerificationComponent } from "./user-verification/user-verification.component";
import { NavbarComponent } from "./navbar/navbar.component";

import { SignUpService } from "./signup/signup.service";
import { LoginService } from "./login/login.service";
import { ErrorService } from "./errors/error.service";
import { UserVerificationService } from "./user-verification/user-verification.service";
import { RouteLoggedInService } from "./route-protected-services/protected-loggedout-route.service";
import { RouteLoggedOutService } from "./route-protected-services/protected-loggedin-route.service";
import { UserService } from "./account/services/user.service";
import { ImagesService } from "./account/services/images.service";




@NgModule({
    declarations: [
        AppComponent, 
        HeaderComponent, 
        HomeComponent, 
        ShopComponent, 
        LoginComponent, 
        SignupComponent, 
        NotFoundComponent, 
        ErrorsComponent,
        UserVerificationComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule, 
    ],
    bootstrap: [AppComponent],
    providers: [
        SignUpService, 
        LoginService, 
        NgbActiveModal, 
        ErrorService,
        RouteLoggedInService,
        RouteLoggedOutService,
        UserVerificationService,
        UserService, 
        ImagesService
    ]
})


export class AppModule {

}