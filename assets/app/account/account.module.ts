import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Services
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";
import { TimeAgoModule } from "../shared/timeago.module";
import { PaginationModule } from "../shared/pagination.module";



@NgModule({
  declarations: [
      AccountComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      AccountRouting,
      TimeAgoModule,
      PaginationModule
  ],
  providers: [
      UserService,
      ImagesService
  ]
})


export class AccountModule { }