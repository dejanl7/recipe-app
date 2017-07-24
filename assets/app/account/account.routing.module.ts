import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components and services
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";
import { MediaComponent } from "./media/media.component";
import { RouteLoggedInService } from "../route-protected-services/protected-loggedout-route.service";


const accountRoutes: Routes = [
    { path: 'account', component: AccountComponent, children: [
        { path: '', component: MediaComponent },
        { path: ':id/edit', component: EditUserInfoComponent },
        { path: 'media', component: MediaComponent }
    ] },
];


@NgModule({
    imports: [
        RouterModule.forChild(accountRoutes)
    ],
    exports: [RouterModule]

})


export class AccountRoutingModule {}