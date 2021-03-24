import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { CheckPermissions } from './checkPermissions';
import { DatePicker } from '@ionic-native/date-picker/ngx';
@Injectable({
  providedIn: 'root'
})
export class OneSignalNotificationsService {
  constructor(private http: HttpClient, private oneSignal: OneSignal,
    private checkPermissions: CheckPermissions,
    private datePicker: DatePicker) { }

  async getIds() {
    return await this.oneSignal.getIds();
  }

  async sendNotificationEvent(datosNoti: Object, date: string) {
    const correo = window.localStorage.getItem('emailUser');
    if (correo == undefined) {
      return await this.checkPermissions.Toast('Ocurrió un error.')
    }
    this.http.post<any>('https://onesignal.com/api/v1/notifications', {
      app_id: "646703c0-aef7-4377-933f-8dc5c367a412",
      // include_player_ids: playersId,
      headings: { "es": datosNoti['title'] },
      contents: { "es": datosNoti['content'], en: "content" },
      filters: [{ "field": "tag", "key": correo, "relation": "=", "value": correo }],
      send_after: date,
      data:{user:correo},
      ttl:1800
    }, { headers: { Authorization: 'Basic NzQ4NmY4OTAtOGFiMi00ZjcxLWEwZDEtODI4ZjQwN2RlNGJk' } }).subscribe(async (data) => {
      await this.checkPermissions.Toast(`La notificación ha sido programada.`)
    }, async (error) => {
      // console.log(error['error']['errors'][0])
      await this.checkPermissions.Toast('Ocurrió un error. Talves la fecha es menor a la fecha actual.')
    })
  }

  async getTags(correo: string) {
    try {
      const tags = await this.oneSignal.getTags();
      await this.checkPermissions.Toast(tags)
      if (tags[correo] == undefined) {
        this.oneSignal.sendTags({
          [correo]: correo
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async showDatePicker(dateMax: string, datosNoti: Object) {
    try {
      if (await this.checkPermissions.checkPermissionsNotifications()) {
        const dateMin = new Date()
        const theme = window.localStorage.getItem('darkTheme');
        const datePicker = await this.datePicker.show({
          date: dateMin,
          mode: 'datetime',
          minDate: dateMin,
          maxDate: new Date(dateMax),
          is24Hour: true,
          titleText: '¿Cuando quieres que te notifiquemos de este evento?',
          okText: 'Aceptar',
          cancelText: 'Cancelar',
          androidTheme: theme == 'true' ? this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK : this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
        });

        if (datePicker <= new Date()) {
          return this.checkPermissions.Toast('Seleccione una fecha u hora, mayor a la actual.')
        }
        if (datePicker >= new Date(dateMax)) {
          return this.checkPermissions.Toast('Seleccione una fecha u hora, menor a la del evento.')
        }
        const fecha = new Date(dateMax).toLocaleDateString('es-Es', { day: 'numeric', weekday: 'long', year: 'numeric', month: 'long' });
        const hora = new Date(dateMax).toLocaleTimeString('es-Es', { hour12: true, hour: '2-digit', minute: '2-digit' })
        datosNoti['content'] = `Recordatorio: Este evento se llevará a cabo el ${fecha} a las ${hora}`;
        this.sendNotificationEvent(datosNoti, new Date(datePicker).toString())
      }
    } catch (e) {
      if (e != 'cancel') {
        this.checkPermissions.Toast('Ocurrió un error.')
      }
    }
  }
}
