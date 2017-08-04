import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from 'ngx-pagination'; 

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Import Pipe
import { TimeAgoPipe } from 'time-ago-pipe';


// import { AllImagesComponent } from "./media/all-images/all-images.component";
// import { NewImagesComponent } from "./media/new-images/new-images.component";
// import { MediaComponent } from "./media/media.component";


@NgModule({
  declarations: [
      AccountComponent,
    //   MediaComponent,
    //   AllImagesComponent,
    //   NewImagesComponent,
      EditUserInfoComponent,
      RecipesComponent,
      CommentsComponent,
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
  ]
})


export class AccountModule { }
