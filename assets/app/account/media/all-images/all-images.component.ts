import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../services/images.service";
import { select, NgRedux } from "ng2-redux";
import { GET_IMAGES_INFO, DELETE_PROFILE_IMAGE } from "../../../redux/actions";
import { ImageInterface } from "../../../redux/interfaces";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})


export class AllImagesComponent implements OnInit, OnDestroy {
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
    subscribeForImgs: any;
    subscribeForDeleteImgs: any;
    imgServiceAllImages: Subscription;
    userServiceProfileImg: Subscription;

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
        this.userServiceProfileImg = this.userService.getProfileImageAndEmail()
        .subscribe( (userProfile) => {
            this.userImg = userProfile.profileImage;
        })

        this.imgServiceAllImages = this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImgs.uploadedImages });
            this.images = userImgs.uploadedImages;
        })   
    } 

    ngOnDestroy() {
       this.imgServiceAllImages.unsubscribe();
       this.userServiceProfileImg.unsubscribe();
    }


    /*=============================
        Modal Dialog
    ===============================*/
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
            this.subscribeForImgs = this.imagesService.deleteImage(this.imgId, this.newImgName)
            .flatMap(imgs => {
                return Observable.forkJoin([
                    Observable.of(imgs),
                    this.imagesService.getUserImages()
                ]);
            })
            .map(data => {
                this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: data[1].uploadedImages });
                if ( this.img == this.userImg ){
                    this.ngRedux.dispatch({ type: DELETE_PROFILE_IMAGE, profileImgPayload: 'none' });
                }
                return data[1];
            });

            this.subscribeForImgs.subscribe(); // Subscribe on multiple observer
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

            this.subscribeForDeleteImgs = this.imagesService.deleteMore(this.checkedArray, this.checkedNameArray)
            .flatMap(imgs => {
                return Observable.forkJoin([
                    Observable.of(imgs),
                    this.imagesService.getUserImages()
                ]);
            })
            .map(data => {
                this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: data[1].uploadedImages });
                let imagePaths = [];

                for(let i=0; i<data[1].uploadedImages.length; i++) {
                    imagePaths.push(data[1].uploadedImages[i].imagePath);
                }
                if( imagePaths.indexOf(this.userImg) === -1 ) {
                        this.ngRedux.dispatch({ type: DELETE_PROFILE_IMAGE, profileImgPayload: 'none' });
                }

                this.checkedArray = [];
                this.checkedNameArray = [];
                this.isCheckedAll = false;
                return data[1];
            });

            this.subscribeForDeleteImgs.subscribe(); // Subscribe on multiple observer
        }
    }
}
