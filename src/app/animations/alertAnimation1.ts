import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';
@Injectable({
    providedIn:'root'
})

export class AnimationAlert1{
    enterAnimation:any;
    leaveAnimation:any;

    constructor(private animationCtrl:AnimationController){
        this.enterAnimation = (baseEl)=>{
            const backDropAnimation = this.animationCtrl.create()
            .addElement(baseEl.querySelector('ion-backdrop')!)
            .fromTo('opacity','0.01','var(--backdrop-opacity)');

            const wrapperAnimation = this.animationCtrl.create()
            .addElement(baseEl.querySelector('.alert-wrapper')!)
            .keyframes([
                { offset: 0,opacity:'1',transform: 'scale(0)' },
                { offset: 0.25, opacity:'1',transform: 'scale(1)' },
                { offset: 0.50, opacity:'1',transform: 'scale(1.1)' },
                { offset: 1, opacity:'1',transform: 'scale(1)' },
            ])

            return this.animationCtrl.create()
            .addElement(baseEl)
            .easing('linear')
            .duration(350)
            .addAnimation([backDropAnimation,wrapperAnimation])
        }

        this.leaveAnimation = (baseEl:any)=>{
            return this.animationCtrl.create()
            .addElement(baseEl.querySelector('.alert-wrapper')!)
            .duration(200)
            .fromTo('transform','scale(1)','scale(0)')
            .addAnimation(
                this.animationCtrl.create()
                .addElement(baseEl.querySelector('ion-backdrop')!)
                .duration(200)
                .fromTo('opacity','0.32','0.01')
              )
        }
    }


}