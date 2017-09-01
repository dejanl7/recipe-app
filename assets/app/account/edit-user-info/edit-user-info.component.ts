import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { NgRedux, select } from "ng2-redux";
import { UserService } from "../../services/user.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../services/images.service";
import { UserInfoModel } from "../../models/userInfo.model";
import { RecipeInfoInterface } from "../../redux/interfaces";
import { GET_PROFILE_IMAGE } from "../../redux/actions";
import { CanComponentDeactivate } from "../../route-protected-services/can-deactivate-guard.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { UpdatedInfoService } from "../../services/updatedinfo.service";


@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})


export class EditUserInfoComponent implements OnInit, OnDestroy, CanComponentDeactivate {
    editUserForm: FormGroup;
    userInformation: UserInfoModel;
    allEmails: Array<string> = [];
    userImgs: Array<string> = [];
    imageIds: Array<string> = [];
    selectedImg: string;
    allowedChangeRoute: boolean = true;
    closeResult: string;
    profileImg: string;
    getUserEmail: Subscription;
    getAccountInfo: Subscription;
    editUserEmail: Subscription;
    editUserFormData: Subscription;
    getUserImgs: Subscription;


    @select() profileImage;

    constructor( private editUserService: UserService, private modalService: NgbModal, private imagesService: ImagesService, private ngRedux: NgRedux<RecipeInfoInterface>, private updateInfo: UpdatedInfoService ) { }

    // On Init
    ngOnInit() {
        this.getUserEmail = this.editUserService.getUserEmails()
        .subscribe( (userMails) => {
            for( let i=0; i<userMails.length; i++) {
                const mail = userMails[i].email;
                this.allEmails.push(mail);
            }
        });

        this.getAccountInfo = this.editUserService.getUserAccountInfo()
        .subscribe( (userInfo: UserInfoModel) => {
            this.userInformation = userInfo;
            this.profileImg = userInfo.profileImage;
        
            this.editUserForm = new FormGroup({
                'editProfileImage': new FormControl(userInfo.profileImage),
                'editFirstName': new FormControl(userInfo.firstName, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z0-9_À-ž \' \u0400-\u04ff.-]*$")]),
                'editLastName': new FormControl(userInfo.lastName, [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9_À-ž \' \u0400-\u04ff.-]*$')]),
                'editUsername': new FormControl({ value: userInfo.username, disabled: true }, Validators.required),
                'editEmail': new FormControl(userInfo.email, [Validators.required, Validators.email]),
                'editAddress': new FormControl(userInfo.address, Validators.pattern('^[a-zA-Z0-9_À-ž \' \/ \u0400-\u04ff.-]*$'))
            });
            
            // Watch E-mails changes and check matching
            this.editUserEmail = this.editUserForm.get('editEmail').valueChanges
            .subscribe( (value) => {
                if( this.allEmails.indexOf(value) !== -1 && this.userInformation.email !== value ) {
                    return this.editUserForm.controls.editEmail.setErrors({'ReservedEmail': true});
                }
            });

            // Check all form changes and ask confirm question
            this.editUserFormData = this.editUserForm.valueChanges
            .subscribe( (values) => {
                this.allowedChangeRoute = false;
            });
        });


        this.getUserImgs = this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            const allUserImages = userImgs.uploadedImages;
            for( let im=0; im<allUserImages.length; im++) {
                this.userImgs.push(allUserImages[im].imagePath);
                this.imageIds.push(allUserImages[im]._id);
            }
        });
    }

    // On Destroy
    ngOnDestroy() {
        this.getUserEmail.unsubscribe();
        this.getAccountInfo.unsubscribe();
        this.editUserEmail.unsubscribe();
        this.editUserFormData.unsubscribe();
        this.getUserImgs.unsubscribe();
    }



    /*=======================
       Choose Profile Image
    =========================*/
    getImgPath( imgPath: string ) {
        if(imgPath == '') {
            this.selectedImg  = '/images/user-avatar.png';
            return this.editUserForm.value.profileImage = '/images/user-avatar.png';
        }
        else {
            this.selectedImg  = imgPath;
            return this.editUserForm.value.profileImage = imgPath;
        }
    }

    /*=======================
       Get Avatar Image
    =========================*/
    getAvatarImg() {
        this.selectedImg = '/images/avatar-profile.png';
        return this.editUserForm.value.profileImage = '/images/user-avatar.png';
    }

    /*=======================
        Update user info
    =========================*/
    updateUserInfo() {
        const updatedInfo = this.editUserForm.value;
        this.editUserService.updateUserInfo(updatedInfo)
        .subscribe( (result) => {
            this.userInformation = result.obj;
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Updated user info...');
            this.ngRedux.dispatch({ type: GET_PROFILE_IMAGE, profileImgPayload: result.obj.profileImage, profileEmailPayload: result.obj.email });
        });
        this.allowedChangeRoute = true;
        this.updateInfo.isUpdated.next(false);
    }

    /*=======================
        Open Modal Dialog
    =========================*/
    open(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            //console.log('Opened');
        }, (reason) => {
            this.closeResult = `Dismissed`;
        });
    }


    /*=======================================
        Protected from leaving unsaved data
    =========================================*/
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if ( this.allowedChangeRoute ) {
            return true;
        }
        else if ( 
            this.editUserForm.value.editProfileImage !== this.profileImg || 
            this.editUserForm.value.editFirstName !== this.userInformation.firstName ||
            this.editUserForm.value.editLastName !== this.userInformation.lastName ||
            this.editUserForm.value.editEmail !== this.userInformation.email ||
            this.editUserForm.value.editAddress !== this.userInformation.address
        ) {
            this.allowedChangeRoute = false;
            return confirm('Do you want to discard the changes?');
        }
            else {
                return true;
            }
    }


}
