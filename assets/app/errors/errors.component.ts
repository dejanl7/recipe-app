import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ErrorService } from "./error.service";
import { ErrorModel } from "./errors.model";


@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})


export class ErrorsComponent implements OnInit {
    closeResult: string;
    error: ErrorModel;
    @ViewChild('content') errorModal: ElementRef;
    displayed = 'none';

    
    constructor( private modalService: NgbModal, private errorService: ErrorService ) { }


    ngOnInit() {
        //this.modalService.open(this.errorModal).result;
        this.errorService.errorOccurred
          .subscribe(
              (error: ErrorModel) => {
                  this.error = error;
                  this.modalService.open(this.errorModal).result;
              }
          );
    }
    

    open(content) {
        this.modalService.open(content).result;
    }

    
}
