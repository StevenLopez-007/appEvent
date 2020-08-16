import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  ionicForm:FormGroup;
  isSubmitted =false;
  constructor(private authService:AuthService,public formBuilder:FormBuilder,private router :Router) { }
  datosUser ={};
  // email:string;
  // password:string;
  register:boolean = false;
  showPassword:boolean=false;
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(5),Validators.pattern('^[a-zA-Z\s]+$')]],
      correo:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@([a-z-0-9\-]+\.)+([a-zA-Z0-9]{2,4})+$')]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }

  login(datosUser:any){
    this.authService.login(datosUser);
  } 
  get errorControl(){
    return this.ionicForm.controls;
  }
  submitForm(){
    this.isSubmitted = true;
    if(!this.register){ this.ionicForm.get('nombre').disable();}
    if(!this.ionicForm.valid){
      console.log("Por favor, cumpla con todos los requisitos");
      
    }
    else{
      this.login(this.ionicForm.value)
    }
    this.ionicForm.get('nombre').enable();
    this.ionicForm.reset();
    
  }

  ir(){
    this.router.navigate(['/'])
  }

}
