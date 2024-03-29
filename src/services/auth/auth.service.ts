import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iuser } from '../../model/iuser';
import { Observable } from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeDetection } from '@ionic-native/theme-detection/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NotificationsService } from '../notifications.service';
import {OneSignalNotificationsService} from '../one-signal-notifications.service';
declare let NavigationBar:any;
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    loginCorrect: boolean = false;
    constructor(@Inject('API_BASE_URL') private url, private http: HttpClient, private router: Router, private loadingController: LoadingController,
        private toastController: ToastController, private statusBar: StatusBar, private themeDetection: ThemeDetection,
        private googlePlus: GooglePlus,
        private notificationsService:NotificationsService,
        private oneSignalNotificationsService:OneSignalNotificationsService) { }

    async login(datosUser: object) {
        this.loginCorrect = false;
        await this.loadingLogin();
        this.http.post<any>(`${this.url}user/login`, { correo: datosUser['correo'], password: datosUser['password'] })
            .pipe(finalize(async () => {
                await this.loadingController.dismiss();
            }))
            .subscribe(async (token) => {
                this.loginCorrect = true;
                await this.checkShowWelcome(token['datosUser']['correo'])
                await this.storeToken(token['accesstoken'], token['refreshToken'], token['datosUser']);
                await this.oneSignalNotificationsService.getTags(token['datosUser']['correo']);
                // this.notificationsService.getToken(token['datosUser']['correo'])
            }, async (e) => {
                if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
                    return await this.toastLogin(e['error']['message'], 'toastClassOffline')
                } else {
                    return await this.toastLogin('Ocurrio un error, verifica tu estado de red.', 'toastClass')
                }
            })
        return this.loginCorrect;
    }

    async loginWithGoogleAndroid() {
        try {
            const res = await this.googlePlus.login({
                webClientId: '972225115593-83d5dn4dos3etu7dp9ap16ph58ia7bs6.apps.googleusercontent.com',
                offline: true
            });
            await this.loadingLogin();
            this.http.post<any>(`${this.url}user/loginWithGoogleAndroid`, { userId: res['userId'] }, { params: { idToken: res['idToken'] } })
                .pipe(finalize(async () => {
                    await this.googlePlus.disconnect();
                    await this.loadingController.dismiss();
                }))
                .subscribe(async token => {
                    await this.storeToken(token['accesstoken'], token['refreshToken'], token['datosUser']);
                    this.router.navigate(['/']);
                },
                async (e)=>{
                    if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
                        return await this.toastLogin(e['error']['message'], 'toastClassOffline')
                    } else {
                        return await this.toastLogin('Ocurrio un error, verifica tu estado de red.', 'toastClass')
                    }
                })
        } catch (e) {
            await this.googlePlus.disconnect();
            await this.loadingController.dismiss();
        }
    }

    async register(datosuser: object) {
        await this.loadingLogin();
        this.http.post<any>(`${this.url}user/create`, { nombre: datosuser['nombre'], correo: datosuser['correo'], password: datosuser['password'] })
            .pipe(finalize(async () => {
                await this.loadingController.dismiss();
            })).subscribe(async(result) => {
                await this.toastLogin(result['message'], 'toastClass');
            },
            async (e)=>{
                if (e instanceof HttpErrorResponse && (e.status == 400 || e.status == 500)) {
                    return await this.toastLogin(e['error']['message'], 'toastClassOffline')
                } else {
                    return await this.toastLogin('Ocurrio un error, verifica tu estado de red.', 'toastClass')
                }
            })
    }

    public editProfileUser(base64: string) {
        return this.http.post<any>(`${this.url}user/editProfileUserPhoto`, { photoBase64: base64 })
    }

    public editNameUser(userName: string) {
        return this.http.post<any>(`${this.url}user/editProfileUserName`, { userName: userName })
    }

    public deletePhoto() {
        return this.http.get<any>(`${this.url}user/deleteProfilePhoto`)
    }

    async forgotPassword(email: string) {
        return this.http.get<any>(`${this.url}user/forgotPassword`, { params: { email: email } })
    }

    finUserByCorreo(correo): Observable<Iuser> {
        return this.http.get<Iuser>(`${this.url}user/findUserByCorreo`, { params: { 'correo': correo } })
    }

    getJwt() {
        return window.localStorage.getItem('a-token')
        // return await this.storage.get('a-token')
    }

    private async storeToken(aToken: string, rToken: string, userData: object) {
        window.localStorage.setItem('a-token', aToken);
        if (rToken != '') {
            window.localStorage.setItem('r-token', rToken)
        }
        if (Object.keys(userData).length !== 0) {
            window.localStorage.setItem('nameUser', userData['nombre']);
            window.localStorage.setItem('emailUser', userData['correo']);
            window.localStorage.setItem('photo', userData['photo'].trim())
        }
    }

    refreshToken() {
        return this.http.get<any>(`${this.url}user/refreshAccessToken`, { headers: { 'r-token': localStorage.getItem('r-token') } })
            .pipe(tap((token: any) => { this.storeToken(token['accesstoken'], '', {}) }))
    }

    async isLoggedIn() {
        // const token = await this.storage.get('a-token')
        // return token?true:false;
        return !!this.getJwt();
    }

    async loadingLogin() {
        const loading = this.loadingController.create({
            cssClass: 'loadingClassLogin',
            message: 'Cargando, espere...',
            spinner: 'crescent',
            translucent: true
        });
        await (await loading).present();
    }

    async toastLogin(message: string, cssClass: string) {
        const toast = await this.toastController.create({
            duration: 3000,
            message: message,
            cssClass: cssClass,
        })

        await toast.present();
    }

    async logOut() {
        try {
            await this.loadingLogin();
            window.localStorage.removeItem('a-token');
            window.localStorage.removeItem('r-token');
            window.localStorage.removeItem('nameUser');
            window.localStorage.removeItem('emailUser');
            window.localStorage.removeItem('photo');
            await this.googlePlus.logout();
            await this.loadingController.dismiss();
            this.router.navigate(['/login']);
        } catch (e) {
            await this.loadingController.dismiss();
            this.router.navigate(['/login']);
        }
    }

    async checkShowWelcome(email: string) {
        try{
        var usersLoged = JSON.parse(window.localStorage.getItem('usersLoged') || "[]");
        if (usersLoged == null) {
            var user = [];
            user.push(email);
            window.localStorage.setItem('usersLoged', JSON.stringify(user));
            await this.showWelcome();
        }
        else {
            if (usersLoged.includes(email)) {
                this.router.navigate(['/']);
            } else {
                usersLoged.push(email);
                window.localStorage.setItem('usersLoged', JSON.stringify(usersLoged));
                await this.showWelcome();
            }
        }
    }catch(e){
        console.log(e)
    }
    }

    async showWelcome() {
        await this.router.navigate(['/welcome'])
    }



    //theme/////////////////////////

    darkMode(dark: boolean) {
        if (['true', 'false'].includes(window.localStorage.getItem('darkTheme'))) {
            window.localStorage.setItem('darkTheme', dark.toString());
        } else {
            window.localStorage.setItem('darkTheme', 'false');
        }
    }
    getDarkMode() {
        return window.localStorage.getItem('darkTheme')
    }

    setDarkfromSystem(dark: boolean) {
        window.localStorage.setItem('takeFromSystem', dark.toString())
    }

    async darkModeSystem(): Promise<boolean> {
        try {
            const res = await this.availableDarkThemeSystem();
            var darkEnable;
            if (res) {
                darkEnable = await this.themeDetection.isDarkModeEnabled();
            }
            return darkEnable.value;
        } catch (e) {
            return false;
        }
        // const prefersDark = window.matchMedia('(prefers-color-scheme:dark)');
    }

    async checkDarkTheme() {
        const darkMode = window.localStorage.getItem('darkTheme');
        const takeFromSystem = window.localStorage.getItem('takeFromSystem');
        if (takeFromSystem == 'true') {
            const dark = await this.darkModeSystem();
            if (dark) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('remove');
            }
        }
        else {
            this.setDarkfromSystem(false);
            if (darkMode == 'true') {
                document.body.classList.add('dark');
            }
            else if (darkMode == 'false') {
                document.body.classList.remove('dark');
            }
            else {
                this.darkMode(false)
                document.body.classList.remove('dark');
            }
        }
    }

    setStatusBarColor() {
        if (document.body.classList.contains('dark')) {
            this.statusBar.show()
            this.statusBar.overlaysWebView(false)
            this.statusBar.styleLightContent();
            this.statusBar.backgroundColorByHexString('#180B4F');
            NavigationBar.backgroundColorByHexString('#3B2E80',false)
        } else {
            this.statusBar.show()
            this.statusBar.overlaysWebView(false)
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#F8F9F9');
            NavigationBar.backgroundColorByName('white',true)
        }
    }

    async availableDarkThemeSystem() {
        try {
            const res = await this.themeDetection.isAvailable();
            return res.value;
        } catch (e) {
            return false;
        }
    }
}