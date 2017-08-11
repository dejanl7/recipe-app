import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { NotFoundComponent } from "./not-found.component";
import { NotFoundRouter } from "./notfound.routing";



@NgModule({
  declarations: [
      NotFoundComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      NotFoundRouter
  ]
})


export class NotFoundModule { }
