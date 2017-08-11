import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { ShopComponent } from "./shop.component";
import { ShopRouter } from "./shop.routing";



@NgModule({
  declarations: [
      ShopComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      ShopRouter
  ]
})


export class ShopModule { }
