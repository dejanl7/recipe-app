import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../services/images.service";
import { select, NgRedux } from "ng2-redux";
import { GET_IMAGES_INFO, DELETE_PROFILE_IMAGE } from "../../../redux/actions";
import { ImageInterface } from "../../../redux/interfaces";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})


export class AllImagesComponent implements OnInit {
    closeResult: string;
    numberOfItemsPerPage: number = 8;
    imgName: string;
    newImgName: string;
    img: string;
    imgId: string;
    userImg: string;
    @select() imagesInfo;
    @select() imagesInfoLength;
    images = [];
    currentPage: number = 1;
    isCheckedAll:boolean = false;
    defaultOption = '';
    checkedArray: Array<string> = [];
    checkedNameArray: Array<string> = [];


    constructor (
        private imagesService: ImagesService, 
        private userService: UserService,
        private modalService: NgbModal, 
        private modalActive: NgbActiveModal,
        private renderer: Renderer2, 
        private el: ElementRef,
        private ngRedux: NgRedux<ImageInterface>,
        private router: Router
    ){}


    ngOnInit() {
        this.userService.getProfileImageAndEmail()
        .subscribe( (userProfile) => {
            this.userImg = userProfile.profileImage;
        });

        this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImgs.uploadedImages });
            this.images = userImgs.uploadedImages;
        });    
    } 



    
    // Modal Dialog
    open(content, imgId:string, img: string, imgName: string, newImgName: string) {
        this.img        = img;
        this.imgName    = imgName;
        this.newImgName = newImgName;
        this.imgId      = imgId;
 
        this.modalService.open(content).result.then((result) => {
            //console.log(result);
        }, (reason) => {
            this.closeResult = 'Dismissed';
        });
    }

    /*=============================
        Delete image
    ===============================*/
    deleteImage( selectedImageId: string, selctedImageName: string ){
        if(confirm("Are you sure to delete?")) {
            this.imagesService.deleteImage(this.imgId, this.newImgName)
            .subscribe( (deleteResult) => { 
                return this.imagesService.getUserImages()
                .subscribe( (userImg) => {
                    this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImg.uploadedImages });
                    if ( this.img == this.userImg ){
                        this.ngRedux.dispatch({ type: DELETE_PROFILE_IMAGE, profileImgPayload: 'none' });
                    }
                    this.checkedArray = [];
                    this.checkedNameArray = [];
                });
            });
        }
    }

    /*=============================
        Check/uncheck box
    ===============================*/
    onChange(imgId: string, imgName: string,  isChecked: boolean) {
        if( isChecked === true && this.checkedArray.indexOf(imgId) === -1 ){
            this.checkedArray.push(imgId);
            this.checkedNameArray.push(imgName);
        }
            else {
                var index = this.checkedArray.indexOf(imgId);
                this.checkedArray.splice(index, 1);
                this.checkedNameArray.splice(index, 1);
            }
    }
    
    /*=============================
       Get current page
    ===============================*/
    getCurrentPage(curPage: number) {
        this.isCheckedAll = false;
        this.checkedArray = [];
        this.checkedNameArray = [];
        return this.currentPage = curPage;
    }

    /*=============================
        Check all boxes
    ===============================*/
    checkedAll() {
        this.isCheckedAll = !this.isCheckedAll;
        this.checkedArray = [];
        this.checkedNameArray = [];

        // Subscribe to attach uploaded images to "images" variable
        this.imagesInfo
        .subscribe( (result) => {
            this.images = result;
        });
        
        if( this.isCheckedAll ){
            var startCounting = this.currentPage * this.numberOfItemsPerPage - this.numberOfItemsPerPage;
            for( let x = startCounting; x < this.currentPage * this.numberOfItemsPerPage; x++ ) {
                if ( this.images[x] ) {
                    this.checkedArray.push(this.images[x]._id);
                    this.checkedNameArray.push(this.images[x].newImageName);
                }
            }
        }
            else {
                this.checkedArray = [];
                this.checkedNameArray = [];
            }
    }

    /*=============================
        Delete multiple
    ===============================*/
    deleteMultiple(){
        if(confirm("Are you sure to delete selected images?")) {
            this.imagesService.deleteMore(this.checkedArray, this.checkedNameArray)
            .subscribe( (result) => { 
                return this.imagesService.getUserImages()
                .subscribe( (userImgs) => {
                    this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImgs.uploadedImages });
                    this.checkedArray = [];
                    this.checkedNameArray = [];
                    this.isCheckedAll = false;
                    console.log(userImgs.uploadedImages);
                });
            });
        }
    }
}
