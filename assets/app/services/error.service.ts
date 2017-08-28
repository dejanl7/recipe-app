import { Injectable, EventEmitter } from '@angular/core';
import { ErrorModel } from "../models/errors.model";

@Injectable()


export class ErrorService {
    errorOccurred = new EventEmitter<ErrorModel>();
    
    
    constructor() {}


    handleError(error: any) {
        const errorData = new ErrorModel(error.title, error.error.message);
        this.errorOccurred.emit(errorData);
    }

}
