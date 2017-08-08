import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";
import { ImagesService } from "../services/images.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ImagesService]
})


export class NavbarComponent implements OnInit {
    showVerticalNavbar: boolean = true;
    showSubmenu: boolean = false;  
    @select() imagesInfoLength;
    imgInfoLength: string;

    constructor( private imagesService: ImagesService ) { }

    ngOnInit() {
        this.imagesService.getUserImages()
        .subscribe( (userImages) => {
            this.imgInfoLength = userImages.uploadedImages.length;
        });
    }

}
