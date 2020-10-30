import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';
@Injectable({
    providedIn:'root'
})
export class AnimationModal1{
    enterAnimation:any;
    leaveAnimation:any;
    constructor(private animationCrtl:AnimationController){
        this.enterAnimation =(baseEl:any)=>{
            const backDropAnimation = this.animationCrtl.create()
            .addElement(baseEl.querySelector('ion-backdrop')!)
            .fromTo('opacity','0.01','var(--backdrop-opacity)');
      
            const wrapperAnimation = this.animationCrtl.create()
            .addElement(baseEl.querySelector('.modal-wrapper')!)
            .keyframes([
              { offset: 0,opacity:'1',transform: 'translateY(150%)' },
              { offset: 1, opacity:'1',transform: 'translateY(55%)' }
            ]);
      
            return this.animationCrtl.create()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(300)
            .addAnimation([backDropAnimation,wrapperAnimation])
          }

        this.leaveAnimation = (baseEl:any)=>{
            return this.animationCrtl.create()
            .addElement(baseEl.querySelector('.modal-wrapper')!)
            .duration(0)
            .fromTo('opacity','0','0')
            .addAnimation(
              this.animationCrtl.create()
              .addElement(baseEl.querySelector('ion-backdrop')!)
              .duration(300)
              .fromTo('opacity','0.32','0.01')
            )
          }
    }
}