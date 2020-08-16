import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class LoginGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    async canActivate(){
        if(await this.authService.isLoggedIn()){
            this.router.navigate(['/'])
            return false
        }
        else{
            return true
        }
    }
}