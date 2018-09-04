import { AuthService } from "./auth.service";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";

import { Injectable } from "@angular/core";


import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate{
    
    constructor(public auth: AuthService, public router: Router){}


    canActivate(route: ActivatedRouteSnapshot,): boolean{
        
        const expectedRole = route.data.expectedRole;

        const token = this.auth.getToken();
        
        // const tokenPayload = decode(token);
        const tokenPayload = decode(token);
        if(
            !this.auth.isAuthencticated() || tokenPayload.role !== 'admin')
            {
            return false;
        }else{
            return true;
        }
    }

}