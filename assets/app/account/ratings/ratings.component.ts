import { Component, OnInit } from '@angular/core';
import { FilterService } from "ng-filter";


export interface Person {
  firstName: string;
  lastName: string;
  birthDate: Date;
}


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  providers: [FilterService]
})


export class RatingsComponent implements OnInit {

    constructor() { }

    ngOnInit() {}

}
