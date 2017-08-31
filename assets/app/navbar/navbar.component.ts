import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs/Subscription";
import { Router, NavigationStart } from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ImagesService]
})


export class NavbarComponent implements OnInit {
    userImages: Subscription;
    imagesInfo: Subscription;
    profileImgEmail: Subscription;
    activatedUrl: Subscription;
    showVerticalNavbar: boolean = true;
    showSubmenu: boolean = false; 
    activeElement: boolean = false; 
    activeCategoryElement: boolean = false;
    @select() imagesInfoLength;
    @select() profileImage;
    @select() profileEmail;
    profileImg: string;
    userEmail: string;
    imgInfoLength: string;


    constructor( private imagesService: ImagesService, private userService: UserService, private router: Router ) { }


    // On Init
    ngOnInit() {
        this.userImages = this.imagesService.getUserImages()
        .subscribe( (userImages) => {
            this.imgInfoLength = userImages.uploadedImages.length;
        });

        // Count length of all user images (redux)
        this.imagesInfo = this.imagesInfoLength
        .subscribe( (userImagesLength) => {
            this.imgInfoLength = userImagesLength;
        });

        // Profile image
        this.profileImgEmail = this.userService.getProfileImageAndEmail()
        .subscribe( (result) => {
            this.profileImg = result.profileImage;
            this.userEmail  = result.email;
        });
        
        // Active route url
        this.activatedUrl = this.router.events
        .subscribe( (url) =>{
            if( url instanceof NavigationStart ) {
                if( url.url.indexOf('edit') > -1 ) {
                    this.activeElement = true;
                    this.activeCategoryElement = false;
                    this.showSubmenu = true;
                }
                else if ( url.url.indexOf('categories') > -1 ) {
                    this.activeElement = false;
                    this.activeCategoryElement = true;
                    this.showSubmenu = true;
                }
                else {
                    this.activeElement = false;
                    this.activeCategoryElement = false;
                }
            }
        });
    }


    // Destroy
    ngOnDestroy() {
        this.userImages.unsubscribe();
        this.imagesInfo.unsubscribe();
        this.profileImgEmail.unsubscribe();
        this.activatedUrl.unsubscribe();
    }

}
