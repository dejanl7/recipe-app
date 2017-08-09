import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../services/images.service";
import { UserInfoModel } from "../../models/userInfo.model";


@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})


export class EditUserInfoComponent implements OnInit {
    editUserForm: FormGroup;
    userInformation: UserInfoModel;
    allEmails: Array<string> = [];
    userImgs: Array<string> = [];
    imageIds: Array<string> = [];
    selectedImg: string;
    closeResult: string;


    constructor( private editUserService: UserService, private modalService: NgbModal, private imagesService: ImagesService ) { }


    ngOnInit() {
        this.editUserService.getUserEmails()
        .subscribe( (userMails) => {
            for( let i=0; i<userMails.length; i++) {
                const mail = userMails[i].email;
                this.allEmails.push(mail);
            }
        });

        this.editUserService.getUserAccountInfo()
        .subscribe( (userInfo: UserInfoModel) => {
            this.userInformation = userInfo;
        
            this.editUserForm = new FormGroup({
                'editProfileImage': new FormControl(userInfo.profileImage),
                'editFirstName': new FormControl(userInfo.firstName, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z0-9_À-ž \' \u0400-\u04ff.-]*$")]),
                'editLastName': new FormControl(userInfo.lastName, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9_À-ž \' \u0400-\u04ff.-]*$')]),
                'editUsername': new FormControl({ value: userInfo.username, disabled: true }, Validators.required),
                'editEmail': new FormControl(userInfo.email, [Validators.required, Validators.email]),
                'editAddress': new FormControl(userInfo.address, Validators.pattern('^[a-zA-Z0-9_À-ž \' \/ \u0400-\u04ff.-]*$'))
            });

            this.editUserForm.get('editEmail').valueChanges
            .subscribe( (value) => {
                if( this.allEmails.indexOf(value) !== -1 && this.userInformation.email !== value ) {
                    return this.editUserForm.controls.editEmail.setErrors({'ReservedEmail': true});
                }
            });
        });
        
        this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            const allUserImages = userImgs.uploadedImages;
            for( let im=0; im<allUserImages.length; im++) {
                this.userImgs.push(allUserImages[im].imagePath);
                this.imageIds.push(allUserImages[im]._id);
            }
        });
    }

    /*=======================
        Methods
    =========================*/
    // Choose Profile Image
    getImgPath( imgPath: string ) {
        this.selectedImg  = imgPath;
        return this.editUserForm.value.profileImage = imgPath;
    }
    getAvatarImg() {
        this.selectedImg = '/images/avatar-profile.png';
    }

    updateUserInfo() {
        const updatedInfo = this.editUserForm.value;
        this.editUserService.updateUserInfo(updatedInfo)
        .subscribe( (result) => {
            this.userInformation = result.obj;
        });
    }

    // Modal Dialog
    open(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            //console.log('Opened');
        }, (reason) => {
            this.closeResult = `Dismissed`;
        });
    }


}
