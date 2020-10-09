import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { NetworkStatePage } from '../app/network-state/network-state.page';
@Injectable({
  providedIn: 'root'
})
export class NetworkGuard implements CanDeactivate<NetworkStatePage> {
  constructor(private network:Network){}
  canDeactivate(): boolean {
    
      const network  = this.network.type;
      if(network =='unknown' || network == 'none'){
        return false
      }
      else{
        return true;
      }
  }
  
}
