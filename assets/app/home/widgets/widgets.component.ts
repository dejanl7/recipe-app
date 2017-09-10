import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html'
})

export class WidgetsComponent implements OnInit {
    arr: Array<any> = ['Some Authors', 'Popular Categories', 'Recent Recipes', 'Popular Recipes'];

    constructor() { }

    ngOnInit() {}

}