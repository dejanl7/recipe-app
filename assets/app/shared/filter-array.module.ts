import { NgModule } from '@angular/core';
import { FilterRecipeArrayPipe } from '../filter-array.pipe';


@NgModule({
    declarations: [
        FilterRecipeArrayPipe
    ], 
    exports: [ 
        FilterRecipeArrayPipe
    ]
})


export class FilterRecipeModule { }