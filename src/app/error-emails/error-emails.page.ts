import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-error-emails',
  templateUrl: './error-emails.page.html',
  styleUrls: ['./error-emails.page.scss'],
})
export class ErrorEmailsPage implements OnInit {

  @Input() falidedEmails:Array<any>;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalController.dismiss();
  }

}
