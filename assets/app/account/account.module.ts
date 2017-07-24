import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { AccountComponent } from "./account.component";
import { EditUserInfoComponent } from './edit-user-info/edit-user-info.component';
import { MediaComponent } from './media/media.component';
import { RecipesComponent } from './recipes/recipes.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OrdersComponent } from './orders/orders.component';

// Import routing module for account application part
import { AccountRouting } from "./account.routing";


@NgModule({
  declarations: [
      AccountComponent,
      EditUserInfoComponent,
      MediaComponent,
      RecipesComponent,
      CommentsComponent,
      RatingsComponent,
      OrdersComponent
  ],
  imports: [
      CommonModule,
      AccountRouting
  ]
})


export class AccountModule { }
