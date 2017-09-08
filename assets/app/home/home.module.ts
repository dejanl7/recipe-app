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


// Services



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
      RatingModule
  ],
  providers: []
})


export class HomeModule { }