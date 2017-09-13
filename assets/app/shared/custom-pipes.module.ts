import { NgModule } from '@angular/core';
import { FilterRecipeArrayPipe } from './pipes/filter-array.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CutstringPipe } from './pipes/cutstring.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';




@NgModule({
    declarations: [
        FilterRecipeArrayPipe,
        OrderByPipe,
        CutstringPipe,
        SafeHtmlPipe,
        KeepHtmlPipe
    ], 
    exports: [ 
        FilterRecipeArrayPipe,
        OrderByPipe,
        CutstringPipe,
        SafeHtmlPipe,
        KeepHtmlPipe
    ]
})


export class CustomPipesModule { }