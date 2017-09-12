import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-widget-authors',
  templateUrl: './widget-authors.component.html',
  styleUrls: ['./widget-authors.component.css']
})


export class WidgetAuthorsComponent implements OnInit, OnDestroy {
    someAuthorsSubscr: Subscription;
    someAuthorsInfo: Array<any> = [];

    constructor( private userService: UserService ) { }

    ngOnInit() {
        this.someAuthorsSubscr = this.userService.getAllUsers()
          .subscribe( (authors) => {
              this.someAuthorsInfo = authors;
          });
    }

    ngOnDestroy() {
        this.someAuthorsSubscr.unsubscribe();
    }
}
 