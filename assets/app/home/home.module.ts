import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { RatingModule } from "ngx-rating";
import { RecipesContentComponent } from './recipes-content/recipes-content.component';
import { TimeAgoModule } from "../shared/timeago.module";
import { CustomPipesModule } from "../shared/custom-pipes.module";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BusyModule } from 'angular2-busy';
import { CustomWidgetModule } from '../shared/shared.widgets';

// Services
import { RecipesService } from "../services/recipes.service";
import { CategoriesService } from "../services/category.service"
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';

// Pipes


@NgModule({
  declarations: [
      HomeComponent,
      RecipesContentComponent,
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      HomeRouting,
      RatingModule,
      TimeAgoModule,
      CustomPipesModule,
      InfiniteScrollModule,
      BusyModule,
      CustomWidgetModule
  ],
  providers: [
      UserService,
      RecipesService,
      CategoriesService,
      AdminService
  ]
})


export class HomeModule { }