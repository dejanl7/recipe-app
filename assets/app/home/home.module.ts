import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { HomeComponent } from "./home.component";
import { HomeRouting } from "./home.routing";
import { RatingModule } from "ngx-rating";
import { WidgetsComponent } from './widgets/widgets.component';


// Services



@NgModule({
  declarations: [
      HomeComponent,
      WidgetsComponent
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