import { Component, OnInit } from '@angular/core';
import { select } from "ng2-redux";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
    showVerticalNavbar: boolean = true;
    showSubmenu: boolean = false;  
    @select() imagesInfoLength;

    constructor() { }

    ngOnInit() {
    }

}
