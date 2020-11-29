import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SwipeCloseModal } from '../animations/modalSwipeAnimation';
import { Keyboard } from '@ionic-native/keyboard/ngx';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers:[SwipeCloseModal,Keyboard]
})
export class ForgotPasswordPage implements OnInit {
  forgotPassForm:FormGroup;
  enviado:boolean=false;
  closeSwipeModal:any = (ev)=>{
    if(ev.target.localName=='ion-backdrop'){
      if(this.keyboard.isVisible){
        this.keyboard.hide()
      }else{
        this.swipeCloseModal.closeModalSwipe(0)
      }
    }
  }
  @ViewChild('headerForgot',{read:ElementRef}) headerForgot:ElementRef
  constructor(private formBuilder:FormBuilder,private toastController: ToastController,
    private loadingController: LoadingController,
    private authService:AuthService,
    private swipeCloseModal:SwipeCloseModal,
    private keyboard:Keyboard) { }

  ngOnInit() {
    this.forgotPassForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]]
    })

    this.keyboard.onKeyboardShow().subscribe(()=>{
      document.getElementById('item').classList.toggle('item-abosolute');
    })
    this.keyboard.onKeyboardHide().subscribe(()=>{
      document.getElementById('item').classList.toggle('item-abosolute');
    })
  }

  ionViewDidEnter(){
    document.body.addEventListener('click',this.closeSwipeModal,true)
    this.swipeCloseModal.swipeAnimation(this.headerForgot);
  }

  get errorsForm(){
    return this.forgotPassForm.controls
  }

  async forgotPass(datos:object){
    await this.loading();
     (await this.authService.forgotPassword(datos['email'])).pipe(finalize(async()=>{
        await this.loadingController.dismiss();
     })).subscribe(async (res)=>{
        this.forgotPassForm.reset()
        await this.toast(res['message'])
     },
     async(e)=>{
      if(e instanceof HttpErrorResponse && (e.status == 400 || e.status ==500)){
        return this.toast(e['error']['message'])
      }else{
        return this.toast('Ups, parece que ha ocurrido un error.')
      }
     })
  }

  sendEmail(){
    this.enviado=true;
    if(this.forgotPassForm.valid){
      this.forgotPass(this.forgotPassForm.value)
    }
    else{
      this.toast('Ingrese un correo electrónico.')
    }
  }

  async toast(message:string){
    const toast = await this.toastController.create({
      message:message,
      cssClass:'toastClass',
      duration:2000
    });
    await toast.present();
  }

  async loading() {
    const loading = this.loadingController.create({
        cssClass: 'loadingClassLogin',
        message: 'Procesando, espere...',
        spinner: 'crescent',
        translucent: true
    });
    await (await loading).present();
}

}
