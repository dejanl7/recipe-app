import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AccountComponent } from "./account.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { MediaComponent } from './media/media.component';

// Impor routing module for account application part
import { AccountRoutingModule } from "./account.routing.module";



@NgModule({
  declarations: [
      AccountComponent,
      NavbarComponent,
      EditUserInfoComponent,
      MediaComponent
  ],
  imports: [
      CommonModule,
      AccountRoutingModule
  ]
})


export class AccountModule { }
