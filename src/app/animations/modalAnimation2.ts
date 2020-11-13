import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';
@Injectable({
    providedIn:'root'
})
export class AnimationModal2{
    enterAnimation:any;
    leaveAnimation:any;
    constructor(private animationCrtl:AnimationController){
        this.enterAnimation =(baseEl:any)=>{
            const backDropAnimation = this.animationCrtl.create()
            .addElement(baseEl.querySelector('ion-backdrop')!)
            .fromTo('opacity','0.01','0.66');
          
            const wrapperAnimation = this.animationCrtl.create()
            .addElement(baseEl.querySelector('.modal-wrapper')!)
            .fromTo('opacity','0.01','1');
      
            return this.animationCrtl.create()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(200)
            .addAnimation([backDropAnimation,wrapperAnimation])
          }

        this.leaveAnimation = (baseEl:any)=>{
            return this.enterAnimation(baseEl).direction('reverse')
          }
    }
}