import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { ModalController, LoadingController, IonRefresher, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import {finalize} from 'rxjs/operators'
import { EventService } from '../../services/event-service.service';
import { AdminColsPage } from '../admin-cols/admin-cols.page';
import { ErrorEmailsPage } from '../error-emails/error-emails.page';
@Component({
  selector: 'app-ver-colaboradores',
  templateUrl: './ver-colaboradores.page.html',
  styleUrls: ['./ver-colaboradores.page.scss'],
})
export class VerColaboradoresPage implements OnInit {
@Input() colaboradores:Array<any>=[];
@Input() nameEvent:string;
@Input() event:Object;
@ViewChild('refreshCols') ionRefresher:IonRefresher;
  mailCol:string='';
  colaborador:Array<any>=[];
  colaboradoresAdd:Array<any>=[];
  buscando:boolean=false;
  colors:Array<string>=['#FFA868','#8A80F6','#F75A83','#9c27b0','#5e35b1'];
  constructor(private modalController: ModalController,
    private authService:AuthService,
    private eventService:EventService,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.getCols();
  }
  async closeModal(){
   await this.modalController.dismiss()
  }

  limpiar(){
    this.colaborador=[];
    this.mailCol = '';
    this.colaboradoresAdd=[];
  }

  async findUserByCorreo(){
    this.buscando=true
    if(this.colaboradoresAdd.some(col=>{return col['correo'].trim()==this.mailCol.trim()})){
     await  this.presentToast('Ya agregaste a este usuario.');
     this.mailCol='';
     this.buscando=false;
    }
    else if(this.colaboradores.some(col=>{return col['correo'].trim()==this.mailCol.trim()})){
      await  this.presentToast('Este usuario ya es colaborador.');
      this.mailCol='';
      this.buscando=false;
    }
    else{
      await this.presentLoading()
      this.authService.finUserByCorreo(this.mailCol.trim()).pipe(finalize(async()=>{
        this.buscando=false
        this.mailCol='';
        await this.loadingController.dismiss();
      })).subscribe(res=>{
        this.colaborador = res['user']
      })
    }
  }

  sendInvitation(){
    this.presentLoading();
    this.eventService.sendInvitation(this.colaboradoresAdd,this.event).pipe(finalize(async ()=>{
      await this.loadingController.dismiss();
      this.limpiar();
    })).subscribe(async (result)=>{
      if(result.status===200){
        if(result['body']['falidedEmails'].length>0){
          await this.modalEmailsErrors(result['body']['falidedEmails']);
        }
        else{
          this.presentToast('Invitacion/es enviadas.')
        }
      }
    },error=>{
      console.log(error)
    })
  }
  getCols(){
    this.eventService.getCols(this.event['_id']).pipe(finalize(async ()=>{
      await this.ionRefresher.complete();
    })).subscribe(result=>{
      this.colaboradores = result['colaboradores']
    })
  }

  deleteCol(index:number){
    this.colaboradoresAdd.splice(index,1);
  }
  addColaborador(col:Object){
    this.colaboradoresAdd.push(col);
    this.colaborador=[];
  }

  async presentLoading(){
    const loading = this.loadingController.create({
      cssClass:`loadingClass`,
      message:'Por favor, espere...',
      translucent:true,
      spinner:'crescent'
    })

    await (await loading).present();
  }

  async viewCols(){
    const modal = await this.modalController.create({
      component:AdminColsPage,
      componentProps:{
        'colaboradores':this.colaboradores,
        'event':this.event
      }
    })

    await modal.present();
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
      duration:3000,
      message:message,
      cssClass:'toastClass'
    });

    await toast.present();
  }

  async modalEmailsErrors(failedEmail){
    const modal = await this.modalController.create({
      component:ErrorEmailsPage,
      componentProps:{
        'falidedEmails':failedEmail
      }
    });

    await modal.present();
  }

}
