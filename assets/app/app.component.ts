import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { GET_IMAGES_INFO } from "./redux/actions";
import { RecipeInfoInterface } from "./redux/interfaces";
import { LoginService } from "./services/login.service";
import { ImagesService } from "./services/images.service";
import { PageScrollConfig } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';

// Tiny MCE
import "tinymce/tinymce.min.js";
import { UpdatedInfoService } from "./services/updatedinfo.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
    @select() imagesInfo;    
    imagesUrlAddress: string = 'http://localhost:3000/image';
    messageSubscr: Subscription;
    isActiveSubscr: Subscription;
    message: string;
    isActive: boolean;
    displaySmoothScrollBar: boolean = false;

    constructor( private loginService: LoginService, private ngRedux: NgRedux<RecipeInfoInterface>, private imagesService: ImagesService, private updateService: UpdatedInfoService, @Inject(DOCUMENT) private document: Document ){}

    // Initialization
    ngOnInit() {
        this.messageSubscr = this.updateService.isUpdated
        .subscribe( (result: boolean) => {
            this.isActive = result;
        });

        this.isActiveSubscr = this.updateService.updatedInfoMessage
        .subscribe( (result: string) => {
            this.message = result;
        });
    }

    // On Destroy
    ngOnDestroy() {
        this.messageSubscr.unsubscribe();
        this.isActiveSubscr.unsubscribe();
    }


    /*==============================
        Check if user is logged in
    ================================*/
    isUserLoggedIn() {
        if( this.loginService.isLoogedIn() ) {
            return true;
        } 
    }

    /*==============================
        Redux Module
    ================================*/
        getImageInfo() {
        this.imagesService.getUserImages()
        .subscribe( (result) => {
            this.ngRedux.dispatch({ type: GET_IMAGES_INFO, payload: result.uploadedImages });
        });
    }

    @HostListener("window:scroll", [])
        onWindowScroll() {
            let distanceFromTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            if (distanceFromTop > 300) {
                this.displaySmoothScrollBar = true;
            } 
                else {
                    this.displaySmoothScrollBar = false;
                }
        }
}