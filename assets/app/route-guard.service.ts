import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()


export class RouteGuardService implements CanActivate {
    
    constructor( private loginService: LoginService ){}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.loginService.isLoogedIn();
    }
}