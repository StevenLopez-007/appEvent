import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { refreshToken } from '../services/refreshToken.service';
import { TokenInterceptor } from './tokenInterceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, CommonModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    refreshToken,
    {provide:'API_BASE_URL',useValue:'http://localhost:3000/'},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
