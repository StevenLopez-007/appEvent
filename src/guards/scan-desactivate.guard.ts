import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class ScanDesactivateGuard implements CanDeactivate<unknown> {
  constructor(private qrScanner:QRScanner){}
  async canDeactivate(): Promise<boolean> {
    try {
    await this.qrScanner.destroy();
    document.getElementById("contentScan").style.backgroundColor="black";
    return true;
    }catch(e){
      console.log(e)
      return true
    }
  }
  
}
