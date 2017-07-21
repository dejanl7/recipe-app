// Angular 4 Basic Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Angular 4 Bootstrap

// Routes
import { routing } from "./app.routing";

// Components, Directives and Services
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

import { SignUpService } from "./signup/signup.service";
import { UserVerificationService } from "./user-verification/user-verification.service";


@NgModule({
    declarations: [
        AppComponent, 
        HeaderComponent, 
        HomeComponent, 
        ProfilesComponent, 
        ShopComponent, 
        LoginComponent, 
        SignupComponent, 
        NotFoundComponent, 
        UserVerificationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        routing,
        ReactiveFormsModule 
    ],
    bootstrap: [AppComponent],
    providers: [SignUpService, UserVerificationService]
})


export class AppModule {

}