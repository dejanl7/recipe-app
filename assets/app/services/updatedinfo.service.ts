import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";

@Injectable()


export class UpdatedInfoService {
    updatedInfoMessage = new Subject();
    isUpdated = new Subject();

    constructor() { }


}
