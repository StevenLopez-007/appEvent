import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { ModalController,ToastController } from '@ionic/angular';
import { EventService } from '../../services/event-service.service';
import { AuthService } from '../../services/auth/auth.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-buscar-col-modal',
  templateUrl: './buscar-col-modal.page.html',
  styleUrls: ['./buscar-col-modal.page.scss'],
})
export class BuscarColModalPage implements OnInit {

  @Input() colsEvent:Array<any>=[]
  colaborador:Array<any>=[];
  colaboradores:Array<any>=[];
  mailCol:string;
  slideOptions={
    slidesPerView:1,
    initialSlide:1,
    spaceBetween:-85,
    // width:350
  };
  constructor(private modalCtrl:ModalController, private eventService:EventService, private authService :AuthService,
    private toastController: ToastController) { }

  ngOnInit() {
  }
  findUserByCorreo(){
    // this.buscando=true
    if( this.existCol()|| this.mailCol=='' || this.mailCol == undefined ||
      this.colaboradores.length>=5|| this.existColInEvent()){
        if(this.existCol()){
          this.presentToast('Ya se agrego a este usuario.')
        }
        if(this.existColInEvent()){
          this.presentToast('Ya existe este col. en el evento.')
        }
      return this.limpiar();  
    }
    this.authService.finUserByCorreo(this.mailCol).pipe(finalize(()=>{
      // this.buscando=false
    })).subscribe(res=>{
      this.colaborador = res['user']
    })
    this.limpiar();
  }

  closeModal(pass:boolean){
    this.modalCtrl.dismiss({ 
      'colaboradores':pass?this.colaboradores:[]
    });
  }

  addCol(cola:Object){
    if(this.colaboradores.some((col)=> col['correo']==cola['correo'] || this.colaboradores.length>=5)){
      this.limpiar();
    }
    else{
    this.colaboradores.push(cola)
    this.limpiar();
    }
  }

  limpiar(){
    this.colaborador =[]
    this.mailCol=''
  }

  existCol(){
    return this.colaboradores.some((col)=> col['correo']==this.mailCol.trim())
  }

  existColInEvent(){
    return this.colsEvent.some((col)=>col['correo']==this.mailCol.trim())
  }

  async presentToast(message:string){
    const toast = await this.toastController.create({
        message:message,
        duration:3000
    });
    toast.present();
  }

  

}
