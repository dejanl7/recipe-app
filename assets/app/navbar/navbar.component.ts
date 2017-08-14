import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";
import { ImagesService } from "../services/images.service";
import { UserService } from "../services/user.service";


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
    @select() profileImage;
    profileImg: string;
    userEmail: string;
    imgInfoLength: string;

    constructor( private imagesService: ImagesService, private userService: UserService ) { }

    ngOnInit() {
        // All user images - count length from async redux
        this.imagesService.getUserImages()
        .subscribe( (userImages) => {
            this.imgInfoLength = userImages.uploadedImages.length;
        });

        // Count length of all user images (without redux)
        this.imagesInfoLength
        .subscribe( (userImagesLength) => {
            this.imgInfoLength = userImagesLength;
        });

        // Profile image
        this.userService.getProfileImageAndEmail()
        .subscribe( (result) => {
            this.profileImg = result.profileImage;
            this.userEmail  = result.email;
        });
    }

}
