import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService:AuthService) {}

  logOut(){
    this.authService.logOut();
  }
}
