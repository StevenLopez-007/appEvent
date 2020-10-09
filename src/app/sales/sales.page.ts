import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, IonSelect, IonRefresher } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { catchError, finalize } from 'rxjs/operators';
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
  @ViewChild('refreshSales') ionRefresher :IonRefresher;
  sales:Observable<ISales[]>;
  optionsSelectPopover={
    header: 'Buscar por...',
  }
  searchBy:string='nameClient';
  searchFilter:string;
  error:boolean=false;
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
    this.error=false;
    await this.presentLoading();
    this.eventService.sales(this.idEvent).pipe(finalize(async ()=>{
      await this.loadingController.dismiss();
      await this.ionRefresher.complete();
    }),catchError((e)=>{this.error=true; return null})).subscribe((res)=>{
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
