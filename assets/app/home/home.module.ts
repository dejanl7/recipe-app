import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { RatingModule } from "ngx-rating";
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetCategoriesComponent } from './widgets/widget-categories/widget-categories.component';
import { WidgetRecipesComponent } from './widgets/widget-recipes/widget-recipes.component';
import { WidgetAuthorsComponent } from './widgets/widget-authors/widget-authors.component';
import { WidgetPopularComponent } from './widgets/widget-popular/widget-popular.component';
import { RecipesContentComponent } from './recipes-content/recipes-content.component';
import { TimeAgoModule } from "../shared/timeago.module";
import { CustomPipesModule } from "../shared/custom-pipes.module";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BusyModule } from 'angular2-busy';

// Services
import { RecipesService } from "../services/recipes.service";
import { CategoriesService } from "../services/category.service"
import { UserService } from '../services/user.service';


@NgModule({
  declarations: [
      HomeComponent,
      WidgetsComponent,
      WidgetCategoriesComponent,
      WidgetRecipesComponent,
      WidgetAuthorsComponent,
      WidgetPopularComponent,
      RecipesContentComponent
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
      BusyModule
  ],
  providers: [
      UserService,
      RecipesService,
      CategoriesService
  ]
})


export class HomeModule { }