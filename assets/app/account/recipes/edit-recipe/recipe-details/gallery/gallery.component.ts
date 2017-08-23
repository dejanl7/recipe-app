import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../../../services/images.service";
import { RecipesService } from "../../../../../services/recipes.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

export class GalleryComponent implements OnInit {
    closeResultEdit: string;
    getAllImgsEdit: Subscription;
    getRecipeInfoGallery: Subscription;
    userImgsEdit: Array<string> = [];
    imageIdsEdit: Array<string> = [];
    userImgPathsEdit: Array<string> = [];
    imgsCheckedEdit: Array<boolean> = [];
    checkedImgArrayEdit: Array<string> = [];
    checkedImgPathArrayEdit: Array<string> = [];
    displayGalleryImgsBoxEdit: boolean = false;
    checkedMarkEdit: boolean = true;
    itemsPerPageEdit: number = 8;
    currentPageEdit: number = 1;
    startIndexFromEdit: number = 0;

    constructor( private modalService: NgbModal, private imagesService: ImagesService, private recipeService: RecipesService, private activatedRoute: ActivatedRoute ) {}

  // Initialization
    ngOnInit() {
        this.getAllImgsEdit = this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            const allUserImages = userImgs.uploadedImages;
            for( let im=0; im<allUserImages.length; im++) {
                this.imageIdsEdit.push(allUserImages[im]._id);
                this.userImgsEdit.push(allUserImages[im].imagePath);
                this.userImgPathsEdit.push(allUserImages[im].imagePath);
            }
        });
        
        this.getRecipeInfoGallery = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.userImgPathsEdit = result.recipeGallery;
            });
        });
    }

    // Destroy
    ngOnDestroy() {
        this.getAllImgsEdit.unsubscribe();
        this.getRecipeInfoGallery.unsubscribe();
    }


    /*=======================
        Open Modal Dialog
    =========================*/
    open(content) {
        this.checkedImgPathArrayEdit = [];
        this.imgsCheckedEdit = [];
        this.checkedImgArrayEdit = [];
        this.checkedMarkEdit = false;
        
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            // console.log('Opened');
        }, (reason) => {
            this.closeResultEdit = `Dismissed`;
        });
    }

    /*=======================
        On Change Page
    =========================*/
    onChangePageEdit(p) {
        this.currentPageEdit = p;
        this.startIndexFromEdit = this.currentPageEdit * this.itemsPerPageEdit - this.itemsPerPageEdit;
    }

    /*=============================
        Check/uncheck image
    ===============================*/
    onChecked(imgId: string, imgPath: string) {
        this.userImgPathsEdit = [];
        if( this.checkedImgArrayEdit.indexOf(imgId) === -1 ){
            this.checkedImgArrayEdit.push(imgId);
            this.checkedImgPathArrayEdit.push(imgPath);
            this.checkedMarkEdit = true;
        }
            else {
                var index = this.checkedImgArrayEdit.indexOf(imgId);
                this.checkedImgArrayEdit.splice(index, 1);
                this.checkedImgPathArrayEdit.splice(index, 1);
            }
    }

    /*===========================
        Display Gallery Images
    =============================*/
    getGalleryImgPaths() {
        if( this.imgsCheckedEdit.length > 0 ) {
            this.displayGalleryImgsBoxEdit = true;
        }
            else {
                this.displayGalleryImgsBoxEdit = false;
            }

        this.checkedMarkEdit = false;
        this.recipeService.galleryImgs.next(this.checkedImgPathArrayEdit);
    }

    /*=============================
        Remove Selected Images
    ===============================*/
    removeSelectedImgs() {
        this.checkedImgPathArrayEdit = [];
        this.displayGalleryImgsBoxEdit = false;
    }

}
