import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  ionicForm:FormGroup;
  isSubmitted =false;
  constructor(private authService:AuthService,public formBuilder:FormBuilder,private statusBar:StatusBar,
              private splashScreen:SplashScreen,) { }
  datosUser ={};
  register:boolean = false;
  showPassword:boolean=false;
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$')]],
      correo:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }
  ionViewWillEnter(){
    document.getElementsByTagName("body")[0].style.backgroundColor="#3d3d3d";
  }
  ionViewDidEnter(){
    this.splashScreen.hide();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('');
  }

  async onKey(){
    await this.submitForm();
  }
  async login(datosUser:any){
    if(await this.authService.login(datosUser)){
      this.ionicForm.reset();
    };
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

}
