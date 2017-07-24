import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit {
    showVerticalNavbar: boolean = true;
    showSubmenu: boolean = false;  

    constructor() { }

    ngOnInit() {
        console.log(this.showVerticalNavbar);
    }

}
