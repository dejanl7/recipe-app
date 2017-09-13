import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})


export class SinglePageComponent implements OnInit {

    constructor( private activatedRoute: ActivatedRoute ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(
            (params) => {
              //console.log(params);
            }
        );
    }

}
