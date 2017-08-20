import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../../services/images.service";
import { RecipesService } from "../../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: 'app-recipe-gallery',
  templateUrl: './recipe-gallery.component.html',
  styleUrls: ['./recipe-gallery.component.css']
})


export class RecipeGalleryComponent implements OnInit {
    closeResult: string;
    getAllImgs: Subscription;
    userImgs: Array<string> = [];
    imageIds: Array<string> = [];
    userImgPaths: Array<string> = [];
    imgsChecked: Array<boolean> = [];
    checkedImgArray: Array<string> = [];
    checkedImgPathArray: Array<string> = [];
    displayGalleryImgsBox: boolean = false;
    checkedMark: boolean = true;
    itemsPerPage: number = 8;
    currentPage: number = 1;
    startIndexFrom: number = 0;

    constructor( private modalService: NgbModal, private imagesService: ImagesService, private recipeService: RecipesService ) { }
  
    // Initialization
    ngOnInit() {
        this.getAllImgs = this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            const allUserImages = userImgs.uploadedImages;
            for( let im=0; im<allUserImages.length; im++) {
                this.imageIds.push(allUserImages[im]._id);
                this.userImgs.push(allUserImages[im].imagePath);
                this.userImgPaths.push(allUserImages[im].imagePath);
            }
        });
        
    }
  
    // Destroy
    ngOnDestroy() {
        this.getAllImgs.unsubscribe();
    }
  

    /*=======================
        Open Modal Dialog
    =========================*/
    open(content) {
        this.checkedImgPathArray = [];
        this.imgsChecked = [];
        this.checkedImgArray = [];
        this.checkedMark = false;
        
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            // console.log('Opened');
        }, (reason) => {
            this.closeResult = `Dismissed`;
        });
    }

    /*=======================
        On Change Page
    =========================*/
    onChangePage(p) {
        this.currentPage = p;
        this.startIndexFrom = this.currentPage * this.itemsPerPage - this.itemsPerPage;
    }

    /*=============================
        Check/uncheck image
    ===============================*/
    onChecked(imgId: string, imgPath: string) {
        if( this.checkedImgArray.indexOf(imgId) === -1 ){
            this.checkedImgArray.push(imgId);
            this.checkedImgPathArray.push(imgPath);
            this.checkedMark = true;
        }
            else {
                var index = this.checkedImgArray.indexOf(imgId);
                this.checkedImgArray.splice(index, 1);
                this.checkedImgPathArray.splice(index, 1);
            }
    }

    /*===========================
        Display Gallery Images
    =============================*/
    getGalleryImgPaths() {
        if( this.imgsChecked.length > 0 ) {
            this.displayGalleryImgsBox = true;
        }
            else {
                this.displayGalleryImgsBox = false;
            }

        this.checkedMark = false;
        this.recipeService.galleryImgs.next(this.checkedImgPathArray);
    }

    /*=============================
        Remove Selected Images
    ===============================*/
    removeSelectedImgs() {
        this.checkedImgPathArray = [];
        this.displayGalleryImgsBox = false;
    }

}