import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit, OnDestroy {
    adminInfoSubscr: Subscription;
    widgets: Array<string> = ['Recent Recipes', 'Popular Categories', 'Some Authors', 'Popular Recipes'];
    homePageLayout: Array<string> = [];

    constructor( private adminService: AdminService ) { }

    // Initialization
    ngOnInit() {
        this.adminInfoSubscr = this.adminService.getAdminInfo()
          .subscribe( (appInfo) => {
              console.log(appInfo);
          });

    }


    // Destroy
    ngOnDestroy() {
        this.adminInfoSubscr.unsubscribe();  
    }

    /*==========================
      Change widget position
    ============================*/
    changeWidgetPosition(position: any) {
        console.log(position);
    }

    /*=================
      Save Changes
    ===================*/
    saveChanges(position: any) {
        console.log(position);
    }

}
