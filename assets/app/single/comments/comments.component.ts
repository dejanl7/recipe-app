import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RecipesService } from '../../services/recipes.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {
    @ViewChild('cf') sendCommentForm: NgForm;
    recipeIdSubscr: Subscription;
    recipeId: string;
    commentInfo: Array<string> = [];
    currentUserId: string;
    isVisibleComment: boolean = false;
    
    constructor( private recipeService: RecipesService, private activatedRoute: ActivatedRoute, private loginService: LoginService ) { }

    ngOnInit() {
        this.recipeIdSubscr = this.activatedRoute.params
        .subscribe( (params: Params) => {
            this.recipeId = params.id;
            this.recipeService.getComments(params.id)
            .subscribe( (recInfo) => {
                console.log(recInfo);
                this.commentInfo = recInfo.recipeComments;
            });
        });

        if ( this.loginService.isLoogedIn ) {
            this.currentUserId = localStorage.getItem('userId') ? localStorage.getItem('userId') : sessionStorage.getItem('userId');
        }

    }

    // Destroy
    ngOnDestroy() {
        this.recipeIdSubscr.unsubscribe();
    }


    /*==========================
        On Form Submit
    ============================*/
    onSubmit() {
        this.recipeService.addNewComment(this.sendCommentForm.value.commentContent, this.recipeId)
        .subscribe( (result) => {
            this.recipeService.getComments(this.recipeId)
            .subscribe( (recInfo) => {
                this.commentInfo = recInfo.recipeComments;
            });
        });
        this.sendCommentForm.reset();
    }
}
