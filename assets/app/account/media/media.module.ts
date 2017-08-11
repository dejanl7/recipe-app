import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { MediaComponent } from "./media.component";
import { AllImagesComponent } from "./all-images/all-images.component";
import { NewImagesComponent } from "./new-images/new-images.component";

// Routing and other
import { MediaRouting } from "./media.routing"; // Routing
import { UploadModule } from "../shared/upload.module";
import { ImagesService } from "../../services/images.service";
import { UserService } from "../../services/user.service";
import { PaginationModule } from "../shared/pagination.module";



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
      UploadModule,
      PaginationModule
  ],
  providers: [
      ImagesService,
      UserService
  ]
})


export class MediaModule { }
