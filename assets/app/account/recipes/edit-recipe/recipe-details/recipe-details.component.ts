import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../../../services/recipes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeModel } from "../../../../models/recipe.model";
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
    @ViewChild('recipeTitleEdit') recipeTitleEdit: ElementRef;
    recipeContentEdit: string;
    recipeCategoriesEdit: Array<string>;
    recipeAttachmentEdit: string;
    recipeGalleryImagesEdit: Array<string>;
  
    constructor( private recipeService: RecipesService, private route: ActivatedRoute, private router: Router ) { }

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
      
    }

      // After View Init
      ngAfterViewInit() {
          tinymce.init({
              selector:'textarea',
              plugins : 'advlist autolink link image lists charmap print preview',
              setup: editor => {
                  this.editor = editor;
                  editor.on('keyup', () => {
                      this.recipeContentEdit = editor.getContent();
                  })
              }
          });
      }

      // Destroy
      ngOnDestroy() {
          tinymce.remove(this.editor);
          this.getRecipeCategoriesEdit.unsubscribe();
          this.getRecipeAttachedImgsEdit.unsubscribe();
          this.getRecipeGalleryImgsEdit.unsubscribe();
      }


      /*========================
          Insert new recipe
      ==========================*/
      updateRecipe() {
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
          });        
      }

}
