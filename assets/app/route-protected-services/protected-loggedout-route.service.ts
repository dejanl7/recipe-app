import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "../services/login.service";

@Injectable()


export class RouteLoggedInService implements CanActivate {
    
    constructor( private loginService: LoginService, private router: Router ){}


    /*=====================================================
        If user is logged out - protected some routes eg:
        "shop" - can't be reached if user is logged out
    =======================================================*/
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if( !this.loginService.isLoogedIn() ){
            this.router.navigate(['/']);
        }
        return this.loginService.isLoogedIn();
    }
}