import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "../login/login.service";

@Injectable()


export class RouteLoggedOutService implements CanActivate {
    
    constructor( private loginService: LoginService, private router: Router ){}

    /*=====================================================
        If user is logged in - protected some routes eg:
        "signup" - can't be touched if user is logged in
    =======================================================*/
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if( this.loginService.isLoogedIn() ){
            this.router.navigate(['/']);
        }
        return !this.loginService.isLoogedIn();
    }
}