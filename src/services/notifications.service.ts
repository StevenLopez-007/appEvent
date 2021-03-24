import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { CheckPermissions } from './checkPermissions';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private tokens:Array<any>=[]
  constructor(private db: AngularFirestore, private fcm: FCM, private checkPermissions: CheckPermissions) { }
  async getToken(emailUser:string) {
    // var emailUser = window.localStorage.getItem('emailUser')
    try {
      if(emailUser != undefined || emailUser != null){
        if (true) {
          const token = await this.fcm.getToken();
          // this.saveTokenInFirebase(emailUser, 'djndjnjfdn');
          this.getTokenByEmail(emailUser,token)
        }
      }
    } catch (e) {
      console.log(e)
      this.checkPermissions.Toast('Ocurrio un error al configurar las notificaciones.')
    }
  }

  private async saveTokenInFirebase(email: string, token: string,tokens:Array<string>) {
    if(tokens.includes('error')){
      return await this.checkPermissions.Toast('Ocurrio un error al configurar las notificaciones.')
    }
    if(tokens.includes('null')){
      return this.db.collection('tokens').doc(email).set({
        emailUser: email,
        token: [token]
      }).then(() => { }).catch((e) => {console.log(e); this.checkPermissions.Toast('Ocurrio un error al configurar las notificaciones.') })
    }
    if(!(tokens.includes(token))){
      tokens.push(token)
      this.db.collection('tokens').doc(email).update({
        token:tokens
      }).then(() => { }).catch((e) => {console.log(e); this.checkPermissions.Toast('Ocurrio un error al configurar las notificaciones.') })
    }
  }

   private getTokenByEmail(email: string,token:string) {
    try {
      this.db.collection('tokens', ref => ref.where('emailUser', '==', email)).valueChanges().subscribe((data) => {
        if(data.length==0){
          this.saveTokenInFirebase(email,token,['null'])
        }else{
          this.saveTokenInFirebase(email,token,data[0]['token'])
        }
      })
    } catch (e) {
      this.saveTokenInFirebase(email,token,['error'])
    }
  }
}
