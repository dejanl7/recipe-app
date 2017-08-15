import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
declare var tinymce: any;


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})


export class RecipesComponent implements OnInit, AfterViewInit, OnDestroy  {
    editor: any;

    constructor() { }

    ngOnInit() { }

 

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


