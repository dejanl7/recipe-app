import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { MediaComponent } from './media/media.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';
import { FileUploadModule } from 'ng2-file-upload';

// Import routing module for account application part
import { AccountRouting } from "./account.routing";

// Services
import { UserService } from "./services/user.service";
import { ImagesService } from "./services/images.service";

// Import Pipe
import {TimeAgoPipe} from 'time-ago-pipe';



@NgModule({
  declarations: [
      AccountComponent,
      EditUserInfoComponent,
      MediaComponent,
      RecipesComponent,
      CommentsComponent,
      RatingsComponent,
      OrdersComponent,
      TimeAgoPipe
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      AccountRouting,
      FileUploadModule
  ],
  providers: [ UserService, ImagesService ]
})


export class AccountModule { }
