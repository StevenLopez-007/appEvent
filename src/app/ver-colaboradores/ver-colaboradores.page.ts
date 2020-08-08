import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { ModalController, LoadingController, IonRefresher } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import {finalize} from 'rxjs/operators'
import { EventService } from '../../services/event-service.service';
@Component({
  selector: 'app-ver-colaboradores',
  templateUrl: './ver-colaboradores.page.html',
  styleUrls: ['./ver-colaboradores.page.scss'],
})
export class VerColaboradoresPage implements OnInit {
@Input() colaboradores:Array<any>=[];
@Input() nameEvent:string;
@Input() event:Object;
@ViewChild(IonRefresher) ionRefresher:IonRefresher;
  mailCol:string='';
  colaborador:Array<any>=[];
  buscando:boolean=false;
  constructor(private modalController: ModalController,
    private authService:AuthService,
    private eventService:EventService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.getCols();
  }
  closeModal(){
    this.modalController.dismiss({
      'dismissed':true
    })
  }

  limpiar(){
    this.colaborador=[];
    this.mailCol = '';
  }

  findUserByCorreo(){
    this.buscando=true
    this.authService.finUserByCorreo(this.mailCol).pipe(finalize(()=>{
      this.buscando=false
    })).subscribe(res=>{
      this.colaborador = res['user']
    })
  }

   deleteCol(correo:any,index:number){
    this.presentLoading();
    const correos = [correo]
    this.eventService.deleteCol(correos,this.event['_id']).pipe(finalize(async ()=>{
     await this.loadingController.dismiss()
    })).subscribe(result=>{
      if(result.status===200){
        this.colaboradores.splice(index,1)
        this.limpiar();
      }
    },error=>{
      console.log(error)
    })
    
    
  }

  sendInvitation(correo:any){
    this.presentLoading();
    this.eventService.sendInvitation([correo],this.event).pipe(finalize(async ()=>{
      await this.loadingController.dismiss()
    })).subscribe(result=>{
      if(result.status===200){
        this.limpiar();
      }
    },error=>{
      console.log(error)
    })
  }

  getCols(){
    this.eventService.getCols(this.event['_id']).pipe(finalize(async ()=>{
      await this.ionRefresher.complete()
    })).subscribe(result=>{
      this.colaboradores = result['colaboradores']
    })
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

}
