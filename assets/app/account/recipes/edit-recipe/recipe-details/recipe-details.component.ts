import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../../services/recipes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeModel } from "../../../../models/recipe.model";
import { UpdatedInfoService } from "../../../../services/updatedinfo.service";
declare var tinymce: any;

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})


export class RecipeDetailsComponent implements OnInit {
    editor: any;
    dbCategories: Subscription;
    dbAttachedImg: Subscription;
    dbGalleryImg: Subscription;
    getRecipeCategoriesEdit: Subscription;
    getRecipeAttachedImgsEdit: Subscription;
    getRecipeGalleryImgsEdit: Subscription;
    getRecipeInfoEdit: Subscription;
    recipeId: string;
    @ViewChild('recipeTitleEdit') recipeTitleEdit: ElementRef;
    recipeContentEdit: string;
    recipeCategoriesEdit: Array<string>;
    recipeAttachmentEdit: string;
    recipeGalleryImagesEdit: Array<string>;
    recipeInfoEdit: any;
  
    constructor( private recipeService: RecipesService, private router: Router, private activatedRoute: ActivatedRoute, private updateInfo: UpdatedInfoService ) { }

    // On Init
    ngOnInit(){
        // From Database
        this.dbAttachedImg = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.recipeAttachmentEdit = result.recipeImage;
            });
        });
        this.dbGalleryImg = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.recipeGalleryImagesEdit = result.recipeGallery;
            });
        });


        // Updated (changed)
        this.getRecipeCategoriesEdit = this.recipeService.categories
        .subscribe( (categories: Array<string>) => {
            this.recipeCategoriesEdit = [];
            for( var c=0; c<categories.length; c++ ) {
                this.recipeCategoriesEdit.push(categories[c]);
            }
        });

        this.getRecipeAttachedImgsEdit = this.recipeService.attachedImg
        .subscribe( (attachemnt: string) => {
            this.recipeAttachmentEdit = attachemnt;
        });

        this.getRecipeGalleryImgsEdit = this.recipeService.galleryImgs
        .subscribe( (gallery: Array<string>) => { 
            this.recipeGalleryImagesEdit = gallery;
        });

        this.getRecipeInfoEdit = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeId = pathElements.id;
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.recipeInfoEdit = result;
                this.recipeTitleEdit.nativeElement.value = result.recipeName;
                this.recipeCategoriesEdit = result.recipeCategories || null;
                this.recipeContentEdit = result.recipeContent;
            });
        });      
    }

    // After View Init
    ngAfterViewInit() {
        tinymce.init({
            selector:'textarea',
            relative_urls : false,
            remove_script_host : false,
            convert_urls : true,
            plugins: ['charmap', 'code', 'colorpicker', 'contextmenu', 'emoticons', 'image', 'link',  'lists', 'table'],
            setup: editor => {
                this.editor = editor;
                editor.on('init', () => {
                    editor.setContent(this.recipeInfoEdit.recipeContent ? this.recipeInfoEdit.recipeContent : '');
                });
                editor.on('keyup', () => {
                    this.recipeContentEdit = editor.getContent();
                });
                editor.on('change', () => {
                    this.recipeContentEdit = editor.getContent();
                });
            }
        });
    }

    // Destroy
    ngOnDestroy() {
        tinymce.remove(this.editor);
        this.dbAttachedImg.unsubscribe();
        this.dbGalleryImg.unsubscribe();
        this.getRecipeCategoriesEdit.unsubscribe();
        this.getRecipeAttachedImgsEdit.unsubscribe();
        this.getRecipeGalleryImgsEdit.unsubscribe();
        this.getRecipeInfoEdit.unsubscribe();
    }


    /*===========================
        Cancel recipe editing
    =============================*/
    cancelRecipeEditing() {
        if( confirm( 'Do you want to cancel recipe editing?') ) {
            this.router.navigate(['account/recipes/edit']);
        }
    }

    /*========================
        Update recipe
    ==========================*/
    updateRecipe() {
        let updateRecipe = new RecipeModel(
            this.recipeTitleEdit.nativeElement.value, 
            this.recipeContentEdit,
            this.recipeCategoriesEdit,
            this.recipeAttachmentEdit,
            this.recipeGalleryImagesEdit
        );
        this.recipeService.updateRecipe(this.recipeId, updateRecipe)
        .subscribe( (resut) => {
            this.router.navigate(['../account/recipes/edit']);
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Updated recipe changes...');
        });   
        this.updateInfo.isUpdated.next(false);
    }

}
