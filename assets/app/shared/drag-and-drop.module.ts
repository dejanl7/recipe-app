import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd'; // Dragg and drop module

@NgModule({
    imports: [
        DndModule
    ], 
    exports: [ 
        DndModule
    ]
})


export class DragAndDropModule { }