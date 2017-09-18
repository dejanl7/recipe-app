import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs/Subscription";
import { Router, NavigationStart } from "@angular/router";
import * as _ from "lodash";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ImagesService]
})


export class NavbarComponent implements OnInit {
    canManageRecipe: boolean;
    canLeaveRating: boolean;
    canBlockRecipeComments: boolean;
    canBuy: boolean;
    canMakeOrder: boolean;
    canManageUsers: boolean;
    canBlockUserComments: boolean ;
    userAuthorizaiton: Subscription;
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

        // Get user roles
        this.userAuthorizaiton = this.userService.getUserAccountInfo()
        .subscribe( (user) => {
            let canManageRecipe         = _.find(user.userRole.roles, { 'canManageRecipe': true });
            let canLeaveRating          = _.find(user.userRole.roles, { 'canLeaveRating': true });
            let canBlockRecipeComments  = _.find(user.userRole.roles, { 'canBlockRecipeComments': true });
            let canBuy                  = _.find(user.userRole.roles, { 'canBuy': true });
            let canMakeOrder            = _.find(user.userRole.roles, { 'canMakeOrder': true });
            let canManageUsers          = _.find(user.userRole.roles, { 'canManageUsers': true });
            let canBlockUserComments    = _.find(user.userRole.roles, { 'canBlockUserComments': true });

            canManageRecipe ? this.canManageRecipe = true: this.canManageRecipe = false;
            canLeaveRating ? this.canLeaveRating = true: this.canLeaveRating = false;
            canBlockRecipeComments ? this.canBlockRecipeComments = true : this.canBlockRecipeComments = false;
            canBuy ? this.canBuy = true : this.canBuy = false;
            canMakeOrder ? this.canMakeOrder : this.canMakeOrder = false;
            canManageUsers ? this.canManageUsers = true : this.canManageUsers = false;
            canBlockUserComments ? this.canBlockUserComments = true : this.canBlockUserComments = false;

            // if ( !canManageRecipe ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canLeaveRating ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canBlockRecipeComments ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canBuy ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canMakeOrder ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canManageUsers ) {
            //     this.router.navigate(['/']);
            // }
            // if ( !canBlockUserComments ) {
            //     this.router.navigate(['/']);
            // }
        });
    }


    // Destroy
    ngOnDestroy() {
        this.userImages.unsubscribe();
        this.imagesInfo.unsubscribe();
        this.profileImgEmail.unsubscribe();
        this.activatedUrl.unsubscribe();
        this.userAuthorizaiton.unsubscribe();
    }


    /*========================
        Grant Creator Role
    ==========================*/
    makeMeCreator() {
        if( confirm('Do you want to extend authorization rules and become recipe creators?') ){
            this.userService.grantCreatorRole()
            .subscribe( (result) => {
                location.reload();
            });
        }
    }
}
