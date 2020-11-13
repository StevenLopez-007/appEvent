import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInput, LoadingController, ModalController } from '@ionic/angular';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { AnimationAlert1 } from '../../app/animations/alertAnimation1';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { CheckPermissions } from '../../services/checkPermissions';
import { OptionsProfilePhotoPage } from '../options-profile-photo/options-profile-photo.page';
import { AnimationModal2 } from '../animations/modalAnimation2';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
  providers: [AnimationAlert1, AnimationModal2, CheckPermissions]
})
export class UserSettingsPage implements OnInit {
  @Input() dataUser: Object;
  @ViewChild('inputEditName') inputEditName:IonInput;
  croppedImagepath = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
  isLoading = false;

  imagePickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
    allow_video: false,
    title: 'Seleccione una imagen.'
  };

  cropOptions: CropOptions = {
    quality: 100,
    targetHeight: 500,
    targetWidth: 500
  }

  cameraOptions:CameraOptions={
    destinationType:this.camera.DestinationType.FILE_URI,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType:this.camera.MediaType.PICTURE,
    sourceType:this.camera.PictureSourceType.CAMERA,
    quality: 100,
  }

  editName:boolean=false;
  nameUserEdit:string='';
  constructor(private file: File, private alertController: AlertController,
    private modalController: ModalController, private crop: Crop, private imagePicker: ImagePicker,
    private animationAlert1: AnimationAlert1,
    private authService: AuthService,
    private checkPermissions: CheckPermissions,
    private animationModal2: AnimationModal2,
    private camera:Camera,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  //Tomar foto de galeria
  async pickImage() {
    if (await this.checkPermissions.checkPermissions()) {
      this.imagePicker.getPictures(this.imagePickerOptions).then((results) => {
        for (var i = 0; i < results.length; i++) {
          this.cropImage(results[i])
        }
      }, (err) => {
        this.alert('Ocurrió un error al obtener las fotos desde tu galería.');
      });
    }
  }

  //Tomar foto con la camara
  async takePicture(){
    if(await this.checkPermissions.checkPermissionsCamera()){
      if(await this.checkPermissions.checkPermissions()){
        this.camera.getPicture(this.cameraOptions).then((imageData)=>{
        this.cropImage(imageData)
          // this.alert(imageData)
        },(err)=>{
          if(err !='Camera cancelled.'){
            this.alert('Ups, ocurrió un error, intentalo de nuevo.'+ err)
          }
        });
      }
    }
  }

  //Eliminar foto
  async deletePhoto(){
    // this.closeEditNameUser()
    await this.loading();
    this.authService.deletePhoto().pipe(catchError(async(e)=>{
      await this.loadingController.dismiss();
      if(e instanceof HttpErrorResponse && (e.status == 400 || e.status==500)){
        return await this.alert(e['error']['message'])
      }
      else{
        return await this.alert('Ocurrió un error al eliminar tu foto')
      }
    }),finalize(async()=>{
      await this.loadingController.dismiss();
    })).subscribe((res)=>{
      if(res != undefined){
        window.localStorage.setItem('photo',res['photo']);
        this.dataUser['photo'] = window.localStorage.getItem('photo');
      }
    })
  }
  //Editar nombre
  async editNameUser(){
    this.closeEditNameUser()
    await this.loading();
    this.authService.editNameUser(this.nameUserEdit).pipe(catchError(async(e)=>{
      await this.loadingController.dismiss();
      if(e instanceof HttpErrorResponse && (e.status == 400 || e.status==500)){
        return await this.alert(e['error']['message'])
      }
      else{
        return await this.alert('Ocurrió un error al cambiar tu nombre de usuario')
      }
    }),finalize(async()=>{
      await this.loadingController.dismiss();
    })).subscribe((res)=>{
      if(res != undefined){
        window.localStorage.setItem('nameUser',res['newName']);
        this.dataUser['nameUser'] = window.localStorage.getItem('nameUser');
      }
    })
  }

  async openEditNameUser(){
    this.editName =true;
    setTimeout(async()=>{
      setTimeout(()=>{
        document.getElementById('listEditName').classList.remove('hideKeyboard')
      },100)
      await this.inputEditName.setFocus();
    },150)
    this.nameUserEdit = this.dataUser['nameUser'];
    
  }

  closeEditNameUser(){
    this.editName=false;
    // this.keyboard.hide();
  }

  cropImage(imgPath) {
    this.crop.crop(imgPath, this.cropOptions)
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          // this.alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.editPhoto(base64)
    }, error => {
      this.isLoading = false;
      this.alert('Ocurrió un error al procesar la imagen, intentalo de nuevo.')
    });
  }

  editPhoto(base64: string) {
    this.authService.editProfileUser(base64).pipe(catchError((error) => {
      this.isLoading = false;
      if(error instanceof HttpErrorResponse && (error.status ==400 || error.status ==500)){
        return this.alert(error['error']['message'])
      }
      else{
        return this.alert('Ocurrió un error, asegurate que la imagen pesa menos 45mb.')
      }
    })).subscribe((res) => {
      if(res != undefined){
        window.localStorage.setItem('photo', base64);
        this.dataUser['photo'] = window.localStorage.getItem('photo');
      }
      this.isLoading = false;
    })
  }

  async closeModal() {
    this.modalController.dismiss();
  }

  async alert(text: any) {
    const alert = await this.alertController.create({
      message: text,
      header: 'Info',
      cssClass: 'alertClass',
      enterAnimation: this.animationAlert1.enterAnimation,
      leaveAnimation: this.animationAlert1.leaveAnimation,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'buttonClassAlert'
        }
      ]
    });

    await alert.present();
  }

  async optionsProfilePhoto() {
    const modal = await this.modalController.create({
      component: OptionsProfilePhotoPage,
      enterAnimation: this.animationModal2.enterAnimation,
      leaveAnimation: this.animationModal2.leaveAnimation,
      backdropDismiss: true,
      cssClass: 'modalProfileOptions'
    });

    await modal.present();

    var { data } = await modal.onDidDismiss();
    data === undefined ? data = 0 : null;
    switch (data['option']) {
      case 1: {
        await this.takePicture()
        break;
      }
      case 2: {
       await this.pickImage()
        break;
      }
      case 3: {
        await this.deletePhoto()
        break;
      }
      default: {
        break;
      }
    }
  }

  async loading(){
    const loading = await this.loadingController.create({
      cssClass:'loadingClass',
      message:'Cargando, espere...',
      spinner:'crescent',
      translucent:false
    });

    await loading.present();
  }
}
