import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html'
})

export class WidgetsComponent implements OnInit, OnDestroy {
    adminInformationSubscr: Subscription;
    widgetsArray: Array<any> = [];

    constructor( private adminService: AdminService ) { }

    // Init
    ngOnInit() {
        this.adminInformationSubscr = this.adminService.getAdminInfo()
        .subscribe( (adminInfo) => {
            for ( var i=0; i<adminInfo.widgets.length; i++ ) {
                this.widgetsArray.push(adminInfo.widgets[i]);
            }
        });
    }

    // Destroy
    ngOnDestroy() {
        this.adminInformationSubscr.unsubscribe();
    }

}