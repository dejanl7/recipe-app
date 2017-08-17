import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
declare var tinymce: any;


@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})


export class AddNewRecipeComponent implements OnInit, AfterViewInit, OnDestroy {
    editor: any;
    
    constructor() { }

    ngOnInit(){ }

    ngAfterViewInit() {
      tinymce.init({
          selector:'textarea',
          plugins : 'advlist autolink link image lists charmap print preview',
          setup: editor => {
            this.editor = editor;
            editor.on('keyup', () => {
              const content = editor.getContent();
              console.log(content)
            })
          }
      });
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
    }

}
