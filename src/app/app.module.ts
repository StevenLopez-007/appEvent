import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TokenInterceptor } from './tokenInterceptor';
import { CommonModule } from '@angular/common';

import {IonicStorageModule} from '@ionic/storage';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import {Network} from '@ionic-native/network/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import {ThemeDetection} from '@ionic-native/theme-detection/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import {File} from '@ionic-native/file/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {FCM} from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {DatePicker} from '@ionic-native/date-picker/ngx'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner,
    Base64ToGallery,
    Diagnostic,
    ThemeDetection,
    Network,
    Crop,
    FCM,
    OneSignal,
    File,
    DatePicker,
    ImagePicker,
    Camera,
    HeaderColor,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:'API_BASE_URL',useValue:' https://apievent2020.herokuapp.com/'},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
