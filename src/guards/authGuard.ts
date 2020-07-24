import {Injectable } from "@angular/core";
import { CanActivate, Router,ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router,private rutaActiva:ActivatedRoute){}

    canActivate(){
        if(this.authService.isLoggedIn()){
           return true;
        }
        else
       {
           console.log('entro else ')
           this.router.navigate(['/login'])
           return false;
       }
    }
}