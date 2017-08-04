import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { FileUploadModule } from "ng2-file-upload";
import { MediaComponent } from "./media.component";
import { AllImagesComponent } from "./all-images/all-images.component";
import { NewImagesComponent } from "./new-images/new-images.component";

// Routing and other
import { MediaRouting } from "./media.routing"; // Routing
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
      MediaComponent,
      AllImagesComponent,
      NewImagesComponent
  ],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MediaRouting,
      NgxPaginationModule,
      FileUploadModule, 
      SharedModule
  ]
})


export class MediaModule { }
