import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { LayoutComponent } from './layout.component';
import { LayoutRouting } from './layout.routing';

// Services
import { AdminService } from '../../services/admin.service';
import { DragDropService, DndModule } from 'ng2-dnd';



@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        LayoutRouting,
        DndModule.forRoot()
    ],
    providers: [
        AdminService,
        DragDropService
    ]
})


export class LayoutModule { }
