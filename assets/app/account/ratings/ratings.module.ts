import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { RatingsComponent } from "./ratings.component";
import { RatingsRouter } from "./ratings.routing";



@NgModule({
  declarations: [
      RatingsComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RatingsRouter
  ]
})


export class RatingsModule { }
