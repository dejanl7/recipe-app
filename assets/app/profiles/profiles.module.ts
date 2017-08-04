import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { ProfilesComponent } from "./profiles.component";

// Import Pipe
import { TimeAgoPipe } from 'time-ago-pipe';
import { ProfilesRouting } from "./profiles.routing";



@NgModule({
  declarations: [
      ProfilesComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      ProfilesRouting
  ]
})


export class ProfilesModule { }
