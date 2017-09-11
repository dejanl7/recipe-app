import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';
import { UpdatedInfoService } from '../../services/updatedinfo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})


export class LayoutComponent implements OnInit, OnDestroy {
    adminInfoSubscr: Subscription;
    widgets: Array<any> = [];
    homePageLayout: string;
    changedHomePageLayout: string;
    widgetChanges: boolean = false;

    constructor( private adminService: AdminService, private updateInfo: UpdatedInfoService ) { }


    // Initialization
    ngOnInit() {
        this.adminInfoSubscr = this.adminService.getAdminInfo()
        .subscribe( (appInfo) => {
            this.widgets = appInfo.widgets;
            this.homePageLayout = appInfo.homePageLayout;
            this.changedHomePageLayout = appInfo.homePageLayout;
        });
    }

    // Destroy
    ngOnDestroy() {
        this.adminInfoSubscr.unsubscribe();  
    }


    /*==========================
      Change widget position
    ============================*/
    changeWidgetPosition(position: Array<any>) {
        this.widgets = position;
        this.widgetChanges = true;
    }

    /*==========================
       Show/hide widget(s)
    ============================*/
    onChecked(index: number, isSelected: boolean) {
        this.widgets[index].widgetDisplay = isSelected;
        this.widgetChanges = true;
    }

    /*==========================
       Select home page layout
    ============================*/
    chooseHomeLayout(selected: any) {
        this.homePageLayout = selected.value;
    }

    /*=================
      Save Changes
    ===================*/
    saveChanges() {
        this.adminService.updateWidgets(this.widgets, this.homePageLayout)
        .subscribe( (result) => {
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Updated layout elements..');
        });
        this.updateInfo.isUpdated.next(false);
        this.widgetChanges = false;
    }

    /*====================
      Unsaved Changes?
    ======================*/
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if ( !this.widgetChanges ) {
            return true;
        }
        else if ( this.changedHomePageLayout !== this.homePageLayout || this.widgetChanges ) {
            return confirm('Do you want to discard the changes?');
        }
            else {
                return true;
            }
    }

}
