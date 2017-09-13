import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})


export class ContentComponent implements OnInit, OnDestroy {
    recIdContentSubscr: Subscription;
    recId: string;
    recName: string;
    recContent: any;
    @ViewChild('printFile') el: ElementRef; 
    
    constructor( private recipeService: RecipesService, private activatedRoute: ActivatedRoute ) { }

    // On Init
    ngOnInit( ) {
        this.recIdContentSubscr = this.activatedRoute.params
        .subscribe( (params: Params) => {
            this.recId = params.id;
            this.recipeService.getSingleRecipe(this.recId)
            .subscribe( (result) => {
                this.recName = result.recipeName;
                this.recContent = result.recipeContent;
            })
        });

    }

    // On Destroy
    ngOnDestroy() {
        this.recIdContentSubscr.unsubscribe();
    }

    /*============================
        Save PDF
    ==============================*/
    printPdf() {
      let printContents, popupWin;
      printContents = this.el.nativeElement.innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=600,width=990');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
          <head>
            <title>${this.recName}</title>
            <style>
            </style>
          </head>
          <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
  }

}
