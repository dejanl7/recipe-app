import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";
import { RecipesComponent } from './recipes/recipes.component';
import { FileUploadModule } from 'ng2-file-upload';

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Services
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";
import { CanDeactivateGuard } from "../route-protected-services/can-deactivate-guard.service";
import { EditUserInfoComponent } from "./edit-user-info/edit-user-info.component";
import { TimeAgoModule } from "../shared/timeago.module";
import { PaginationModule } from "../shared/pagination.module";



@NgModule({
  declarations: [
      AccountComponent,
      RecipesComponent,
      EditUserInfoComponent
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
      ImagesService,
      CanDeactivateGuard
  ]
})


export class AccountModule { }