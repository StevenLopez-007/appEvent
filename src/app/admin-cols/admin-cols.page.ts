import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { EventService } from 'src/services/event-service.service';

@Component({
  selector: 'app-admin-cols',
  templateUrl: './admin-cols.page.html',
  styleUrls: ['./admin-cols.page.scss'],
})
export class AdminColsPage implements OnInit {

  @Input()colaboradores:Array<any>=[];
  @Input() event:Object; 
  constructor(private eventService:EventService,private loadingController: LoadingController,private modalController: ModalController) { }

  ngOnInit() {}

  deleteCol(correo:any,index:number){
    this.presentLoading();
    const correos = [correo]
    this.eventService.deleteCol(correos,this.event['_id']).pipe(finalize(async ()=>{
     await this.loadingController.dismiss()
    })).subscribe(result=>{
      if(result.status===200){
        this.colaboradores.splice(index,1)
        // this.limpiar();
      }
    },error=>{
      console.log(error)
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

  async closeModal(){
    await this.modalController.dismiss();
  }

}
