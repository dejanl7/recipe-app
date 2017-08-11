import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components and modules
import { EditUserInfoComponent } from "./edit-user-info.component";
import { EditUserInfoRouting } from "./edituser.routing";
import { TimeAgoModule } from "../../shared/timeago.module";
import { PaginationModule } from "../../shared/pagination.module";


@NgModule({
    declarations: [
        EditUserInfoComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        EditUserInfoRouting,
        TimeAgoModule,
        PaginationModule
    ]
})


export class EditUserInfoModule { }
