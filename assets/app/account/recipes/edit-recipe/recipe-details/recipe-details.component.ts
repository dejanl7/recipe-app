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
    getRecipeCategoriesEdit: Subscription;
    getRecipeAttachedImgsEdit: Subscription;
    getRecipeGalleryImgsEdit: Subscription;
    getRecipeInfoEdit: Subscription;
    @ViewChild('recipeTitleEdit') recipeTitleEdit: ElementRef;
    recipeContentEdit: string;
    recipeCategoriesEdit: Array<string>;
    recipeAttachmentEdit: string;
    recipeGalleryImagesEdit: Array<string>;
    recipeIdEdit: string;
    recipeInfoEdit: any;
  
    constructor( private recipeService: RecipesService, private route: ActivatedRoute, private router: Router, private activatedRoute: ActivatedRoute, private updateInfo: UpdatedInfoService ) { }

    // On Init
    ngOnInit(){
        this.getRecipeCategoriesEdit = this.recipeService.categories
        .subscribe( (categories: Array<string>) => {
            this.recipeCategoriesEdit = categories;
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
            this.recipeIdEdit = pathElements.id;
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.recipeInfoEdit = result;
                this.recipeTitleEdit.nativeElement.value = result.recipeName;
                this.recipeCategoriesEdit = result.recipeCategories;
            });
        });

       
      
    }

    // After View Init
    ngAfterViewInit() {
        tinymce.init({
            selector:'textarea',
            plugins: ['advlist', 'anchor', 'autolink', 'autoresize', 'bbcode',  'charmap', 'code', 'colorpicker', 'contextmenu', 'emoticons', 'image', 'link',  'lists', 'paste', 'print', 'preview', 'table'],
            setup: editor => {
                this.editor = editor;
                editor.on('init', () => {
                    editor.setContent(this.recipeInfoEdit.recipeContent ? this.recipeInfoEdit.recipeContent : '');
                });
                editor.on('keyup', () => {
                    this.recipeContentEdit = editor.getContent();
                });
            }
        });
    }

    // Destroy
    ngOnDestroy() {
        tinymce.remove(this.editor);
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
    updateRecipe(recipeId: string) {
        let saveRecipe = new RecipeModel(
            this.recipeTitleEdit.nativeElement.value ? this.recipeTitleEdit.nativeElement.value : null, 
            this.recipeContentEdit ? this.recipeContentEdit : null,
            this.recipeCategoriesEdit ? this.recipeCategoriesEdit : null,
            this.recipeAttachmentEdit ? this.recipeAttachmentEdit : null,
            this.recipeGalleryImagesEdit ? this.recipeGalleryImagesEdit : null
        );
        this.recipeService.addNewRecipe(saveRecipe)
        .subscribe( (resut) => {
            this.router.navigate(['../account/recipes/edit']);
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Updated recipe changes...');
        });   
        this.updateInfo.isUpdated.next(false);     
    }

}
