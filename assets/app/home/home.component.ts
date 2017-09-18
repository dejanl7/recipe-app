import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
    homePageLayout: Subscription;
    homeLayout: string;

    constructor( private adminService: AdminService ) { }

    // Init
    ngOnInit() { 
        this.homePageLayout = this.adminService.getAdminInfo()
        .subscribe( (result) => {
            this.homeLayout = result.homePageLayout;
        });
    }

    // Destroy
    ngOnDestroy() {
        this.homePageLayout.unsubscribe();
    }

    
}
