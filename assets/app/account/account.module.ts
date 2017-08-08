import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination'; 

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Import Pipe
import { TimeAgoPipe } from 'time-ago-pipe';
import { ImagesService } from "../services/images.service";



@NgModule({
  declarations: [
      AccountComponent,
      EditUserInfoComponent,
      RecipesComponent,
      RatingsComponent,
      OrdersComponent,
      TimeAgoPipe
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
      ImagesService
  ]
})


export class AccountModule { }