import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserVerificationService } from "./user-verification.service";


@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})


export class UserVerificationComponent implements OnInit {
    verUserInfo;


    constructor(private router: Router, private activatedRoute: ActivatedRoute, private verService: UserVerificationService) { }


    ngOnInit() {
        this.verService.getVerUserInfo(this.activatedRoute.snapshot.params['id'])
        .subscribe((data: Object) => {
            this.verUserInfo = data;
        });

        this.verService.updateVerificatonStatus(this.activatedRoute.snapshot.params['id'])
        .subscribe(
            result => console.log(result)
        )
    }

}
