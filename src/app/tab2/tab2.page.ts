import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { BuscarColModalPage } from '../buscar-col-modal/buscar-col-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../services/event-service.service';
import { finalize } from 'rxjs/operators';
import { ErrorEmailsPage } from '../error-emails/error-emails.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // customPickerOptions:any;
  eventForm: FormGroup;
  colaboradores: Array<any> = [];
  enviado: boolean = false;
  constructor(private loadingController: LoadingController, private modalCtrl: ModalController, private formBuilder: FormBuilder, private eventService: EventService) {
    this.addCol = this.addCol.bind(this)
  }

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(128)]],
      numeroEntradas: [0, [Validators.required, Validators.min(1),Validators.pattern(/^(0|-*[1-9]+[0-9]*)$/)]],
      precioEntrada: [0, [Validators.required, Validators.min(0.01)]],
      fecha: [null, [Validators.required]]
    })

  }
  get errrosForm() {
    return this.eventForm.controls
  }

  get actualYear() {
    return new Date().getFullYear()
  }

  saveEvent() {
    this.enviado = true
    if (!this.eventForm.valid) {
      console.log("Cumpla los requisitos")
      console.log(this.eventForm.controls)
    }
    else {
      this.presentLoading();
      this.eventService.saveEvent(this.eventForm.value).pipe(finalize(()=>{this.loadingController.dismiss()})).subscribe(result => {
        if (result.status === 200) {
          this.eventService.sendInvitation(this.colaboradores, result['body']['event']).pipe(finalize(async ()=>{
            this.eventForm.reset();
            await this.loadingController.dismiss();
          })).pipe(finalize(()=>{
            this.loadingController.dismiss()
          }))
          .subscribe(result => {
            if(result['body']['falidedEmails'].length>0){
              this.modalEmailsErrors(result['body']['falidedEmails'])
            }
          },error=>{
            console.error(error)
          })
        }
        // console.log(result['body']['event'])
      });
    }
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: BuscarColModalPage,
      cssClass: '',
      componentProps: {
        'colsEvent': this.colaboradores
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss()
    this.addCol(data);
  }

  async modalEmailsErrors(falidedEmails){
    const modal =await this.modalCtrl.create({
      component:ErrorEmailsPage,
      componentProps:{
        'falidedEmails':falidedEmails
      }
    });
    await (await modal).present()
  }

  addCol(data: Object) {
    data['colaboradores'].map(col => {
      this.colaboradores.push(col)
    })
  }

  async presentLoading() {
    const loading = this.loadingController.create({
      cssClass: 'loadingClass',
      message: 'Guardando...',
      spinner:'crescent',
      translucent: true
    });

    await (await loading).present();
  }


}
