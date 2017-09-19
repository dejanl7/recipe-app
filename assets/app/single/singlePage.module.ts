import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { SinglePageComponent } from './single-page.component';
import { MediaComponent } from './media/media.component';
import { ContentComponent } from './content/content.component';
import { CommentsComponent } from './comments/comments.component';
import { RatingModule } from "ngx-rating";
import { TimeAgoModule } from "../shared/timeago.module";
import { CustomPipesModule } from "../shared/custom-pipes.module";
import { SinglePageRouting } from './singlePage.routing';
import { CustomWidgetModule } from '../shared/shared.widgets';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'angular2-lightbox';

// Services
import { RecipesService } from "../services/recipes.service";
import { CategoriesService } from "../services/category.service"
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { PaginationModule } from '../shared/pagination.module';


@NgModule({
  declarations: [
      SinglePageComponent,
      MediaComponent,
      ContentComponent,
      CommentsComponent
  ],
  imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RatingModule,
      TimeAgoModule,
      CustomPipesModule,
      SinglePageRouting,
      CustomWidgetModule,
      NgbModule.forRoot(),
      LightboxModule,
      PaginationModule
  ],
  providers: [
      UserService,
      RecipesService,
      CategoriesService,
      AdminService
  ]
})


export class SinglePageModule { }