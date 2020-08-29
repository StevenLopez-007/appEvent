import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { finalize } from 'rxjs/operators';
import { ISales } from '../../model/i-sales';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  @Input() idEvent:string;
  sales:Observable<ISales[]>;
  constructor(private modalController: ModalController,
              private eventService:EventService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getSales();
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  getSales(){
    this.eventService.sales(this.idEvent).pipe(finalize(async ()=>{
      await this.loadingController.dismiss()
    })).subscribe((res)=>{
      this.sales = res['sales'];
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      cssClass:'loadingClass',
      translucent:true
    });
    await loading.present();
  }
}
