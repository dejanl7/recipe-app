import { Component, OnInit } from '@angular/core';
import { EditUserInfoService } from "./edit-user-info.service";
import { UserInfoModel } from "../models/userInfo.model";


@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})


export class EditUserInfoComponent implements OnInit {
    userId: string;
    userToken: string;
    userInformation: UserInfoModel;


    constructor( private editUserService: EditUserInfoService ) { }


    ngOnInit() {
        if( localStorage.getItem('token') !== null ) {
            this.userId    = localStorage.getItem('userId');
            this.userToken = localStorage.getItem('token');
        }
          else if( sessionStorage.getItem('token') !== null ) {
              this.userId    =  sessionStorage.getItem('userId');
              this.userToken = sessionStorage.getItem('token');
          }
        
        this.editUserService.getUserAccountInfo(this.userId, this.userToken)
          .subscribe( (userAccountInfo: UserInfoModel) => {
              this.userInformation = userAccountInfo;
          });
    }


    // Methods
    updateUserInfo() {
        
    }

}
