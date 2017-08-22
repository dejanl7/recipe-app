import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { RatingsComponent } from "./ratings.component";
import { RatingsRouter } from "./ratings.routing";
import { TestComponent } from "../test/test.component";


// Pipes
import { AppModule as FilterModule } from 'ng-filter'; // Filter Module
import { CutstringPipe } from "../../cutstring.pipe";
import { FilterRecipeArrayPipe } from "../../filter-array.pipe";



@NgModule({
  declarations: [
      RatingsComponent,
      TestComponent,
      CutstringPipe,
     // FilterRecipeArrayPipe
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RatingsRouter,
      FilterModule
  ]
})


export class RatingsModule { }
