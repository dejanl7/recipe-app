import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetPopularComponent } from './widgets/widget-popular/widget-popular.component';
import { WidgetRecipesComponent } from './widgets/widget-recipes/widget-recipes.component';
import { WidgetCategoriesComponent } from './widgets/widget-categories/widget-categories.component';
import { WidgetAuthorsComponent } from './widgets/widget-authors/widget-authors.component';


@NgModule({
    declarations: [
        WidgetsComponent,
        WidgetCategoriesComponent,
        WidgetRecipesComponent,
        WidgetAuthorsComponent,
        WidgetPopularComponent,
    ], 
    imports: [
        CommonModule 
    ],
    exports: [
        WidgetsComponent,
        WidgetCategoriesComponent,
        WidgetRecipesComponent,
        WidgetAuthorsComponent,
        WidgetPopularComponent,
    ]
})


export class CustomWidgetModule { }