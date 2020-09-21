import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, IonSelect } from '@ionic/angular';
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
  @ViewChild('selectFilter') selectionFilter:IonSelect;
  sales:Observable<ISales[]>;
  optionsSelectPopover={
    header: 'Buscar por...',
  }
  searchPer:string='nameClient';
  searchFilter:string;
  constructor(private modalController: ModalController,
              private eventService:EventService,
              private loadingController: LoadingController) { }

  async ngOnInit() {
    await this.getSales();
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async getSales(){
    await this.presentLoading();
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

  async  openFilters(){
    await this.selectionFilter.open();
  }
}
