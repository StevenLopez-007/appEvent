import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { EventService } from '../../services/event-service.service';
import { finalize, catchError } from 'rxjs/operators';
import { isUndefined } from 'util';

@Component({
  selector: 'app-sale-ticket',
  templateUrl: './sale-ticket.page.html',
  styleUrls: ['./sale-ticket.page.scss'],
})
export class SaleTicketPage implements OnInit {
  @Input() idEvent:string;
  enviado=false;
  taquillaForm:FormGroup;
  constructor(private loadingController: LoadingController,
              private modalController: ModalController,
              private formBuilder:FormBuilder,
              private eventService:EventService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.taquillaForm = this.formBuilder.group({
      name:['',[Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
      email:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]]
    })
  }

  get errrosForm(){
    return this.taquillaForm.controls;
  }

  saleTicket(datos:Object){
    this.loading();
    this.eventService.saleTicket(this.idEvent,datos).pipe(finalize(async ()=>{
      await this.loadingController.dismiss();
    }),catchError((err)=>{
      return this.Toast('Ocurrió un error, intentelo de nuevo');
    })).subscribe((res)=>{
      if(res != undefined){
        if(res['status']==200){
          this.Toast('Venta completada.')
          this.taquillaForm.reset();
          this.enviado=false;
        }
      }
    })
  }

  async sale(){
    this.enviado =true;
    if(this.taquillaForm.valid){
      this.saleTicket(this.taquillaForm.value);
    }
    else{
      this.Toast('Rellene los campos.');
    }
  }

  async loading(){
    const loading = await this.loadingController.create({
      message:'Procesando...',
      cssClass:'loadingClass',
      translucent:true
    })
    await loading.present();
  }

  async Toast(message:string){
    const toast =await this.toastController.create({
      cssClass:'toastClass',
      message:message,
      duration:3000,
      keyboardClose:true

    })
    toast.present();
  }

  closeModal(){
    this.modalController.dismiss();
  }
}
