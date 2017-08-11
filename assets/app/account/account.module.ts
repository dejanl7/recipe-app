import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";
import { RecipesComponent } from './recipes/recipes.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination'; 

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Services
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";
import { SharedModule } from "./shared/shared.module";



@NgModule({
  declarations: [
      AccountComponent,
      RecipesComponent,
  ],
  imports: [
      NgxPaginationModule,
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      AccountRouting
  ],
  providers: [
      UserService,
      ImagesService
  ]
})


export class AccountModule { }