import { NgModule } from '@angular/core';
import { FilterRecipeArrayPipe } from '../filter-array.pipe';
import { OrderByPipe } from "../order-by.pipe";
import { CutstringPipe } from "../cutstring.pipe";


@NgModule({
    declarations: [
        FilterRecipeArrayPipe,
        OrderByPipe,
        CutstringPipe
    ], 
    exports: [ 
        FilterRecipeArrayPipe,
        OrderByPipe,
        CutstringPipe
    ]
})


export class CustomPipesModule { }