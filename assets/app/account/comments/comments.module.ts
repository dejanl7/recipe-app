import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { CommentsComponent } from "./comments.component";
import { CommentsRouting } from "./comments.routing";



@NgModule({
  declarations: [
      CommentsComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      CommentsRouting
  ]
})


export class CommentsModule { }
