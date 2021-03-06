// Angular 4 Basic Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Angular 4 Bootstrap

// Routes
import { AppRoutingModule } from "./app.routing";

// Components, Modules, Directives and Services
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorsComponent } from './errors/errors.component';
import { UserVerificationComponent } from "./user-verification/user-verification.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { SignUpService } from "./services/signup.service";
import { LoginService } from "./services/login.service";
import { ErrorService } from "./services/error.service";
import { UserVerificationService } from "./services/user-verification.service";
import { RouteLoggedInService } from "./route-protected-services/protected-loggedout-route.service";
import { RouteLoggedOutService } from "./route-protected-services/protected-loggedin-route.service";
import { UserService } from "./services/user.service";
import { ImagesService } from "./services/images.service";
import { CanDeactivateGuard } from "./route-protected-services/can-deactivate-guard.service";
import { UpdatedInfoService } from "./services/updatedinfo.service";

// Import REDUX
import { NgRedux, NgReduxModule } from 'ng2-redux'; // Redux
import { RECIPE_INFO_STATE, messagingReducer } from "./redux/store";
import { RecipeInfoInterface } from "./redux/interfaces";


@NgModule({
    declarations: [
        AppComponent, 
        HeaderComponent,
        LoginComponent, 
        SignupComponent, 
        ErrorsComponent,
        UserVerificationComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        NgReduxModule,
        NoopAnimationsModule,
        Ng2PageScrollModule        
    ],
    providers: [
        SignUpService, 
        LoginService, 
        NgbActiveModal, 
        ErrorService,
        RouteLoggedInService,
        RouteLoggedOutService,
        UserVerificationService,
        UserService, 
        ImagesService,
        CanDeactivateGuard,
        UpdatedInfoService
    ],
    bootstrap: [AppComponent],
})


export class AppModule {
    constructor(ngRedux: NgRedux<any>) {
        ngRedux.configureStore(messagingReducer, RECIPE_INFO_STATE);
    }
}