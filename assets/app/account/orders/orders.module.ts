import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { OrdersComponent } from "./orders.component";
import { OrderRouting } from "./orders.routing";



@NgModule({
  declarations: [
      OrdersComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      OrderRouting
  ]
})


export class OrdersModule { }
