import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { AnimationModal1 } from '../animations/modalAnimation1';
declare let NavigationBar:any;
@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
  providers:[AnimationModal1]
})
export class Login1Page implements OnInit {
  ionicForm:FormGroup;
  isSubmitted =false;
  social:boolean=false;
  constructor(private authService:AuthService,public formBuilder:FormBuilder,private statusBar:StatusBar,
              private splashScreen:SplashScreen,private modalController: ModalController,
              private animationModal1:AnimationModal1) { }
  datosUser ={};
  register:boolean = false;
  showPassword:boolean=false;
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(35),Validators.pattern('^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$')]],
      correo:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }
  ionViewWillEnter(){
    document.getElementsByTagName("body")[0].style.backgroundColor="#3d3d3d";
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('');
    this.ionicForm.reset();
    NavigationBar.backgroundColorByHexString('#3d3d3d',false);
    setTimeout(()=>{this.splashScreen.hide();},600)
  }

  async onKey(){
    await this.submitForm();
  }
  async login(datosUser:any){
   await this.authService.login(datosUser)
  }

  async loginWithGoogle(){
    await this.authService.loginWithGoogleAndroid();
  }
  async registerUser(datosUser:any){
    await this.authService.register(datosUser);
  }
  get errorControl(){
    return this.ionicForm.controls;
  }
  async submitForm(){
    this.isSubmitted = true;
    if(!this.register){ this.ionicForm.get('nombre').disable();}
    if(!this.ionicForm.valid){
      this.authService.toastLogin('Por favor, cumpla con todos los requisitos','toastClass');
      
    }
    else{
      if(this.register){
        await this.registerUser(this.ionicForm.value)
      }
      else{
        await this.login(this.ionicForm.value);
      }
      // console.log(this.ionicForm.value)
      
    }
    this.ionicForm.get('nombre').enable();
    
  }


  //forgot password

  async modalForgotPassword(){
    const modal = await this.modalController.create({
      component:ForgotPasswordPage,
      cssClass:'modalSaleSwipeLogin',
      backdropDismiss:false,
      mode:'md',
      enterAnimation:this.animationModal1.enterAnimation,
      leaveAnimation:this.animationModal1.leaveAnimation
    });

    await modal.present();
  }
}
