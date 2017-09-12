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

// Services
import { RecipesService } from "../services/recipes.service";
import { CategoriesService } from "../services/category.service"
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { CustomWidgetModule } from '../shared/shared.widgets';


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
      CustomWidgetModule
  ],
  providers: [
      UserService,
      RecipesService,
      CategoriesService,
      AdminService
  ]
})


export class SinglePageModule { }