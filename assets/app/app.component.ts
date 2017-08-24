import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from "ng2-redux";
import { GET_IMAGES_INFO } from "./redux/actions";
import { ImageInterface } from "./redux/interfaces";
import { LoginService } from "./services/login.service";
import { ImagesService } from "./services/images.service";

// Tiny MCE
import "tinymce/tinymce.min.js";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
    @select() imagesInfo;    
    imagesUrlAddress: string = 'http://localhost:3000/image';

    constructor( private loginService: LoginService, private ngRedux: NgRedux<ImageInterface>, private imagesService: ImagesService ){}

    ngOnInit() {}

    isUserLoggedIn() {
        if( this.loginService.isLoogedIn() ) {
            return true;
        } 
    }

    // Redux Module
    getImageInfo() {
        this.imagesService.getUserImages()
        .subscribe( (result) => {
            console.log(result.uploadedImages);
            this.ngRedux.dispatch({ type: GET_IMAGES_INFO, payload: result.uploadedImages });
        });
    }
}