import { Injectable, ElementRef } from '@angular/core';
import { Gesture, GestureController, AnimationController, ModalController } from '@ionic/angular';
@Injectable()
export class SwipeCloseModal {
  private animation?: any;
  private gesture?: Gesture;
  private started: boolean = false;
  private MAX_TRANSLATE: number = 150;
  private heightModal: number;
  private close:boolean=true;
  constructor(private gestureCtrl: GestureController, private animationCtrl: AnimationController, private modalController: ModalController) { }

  swipeAnimation(header: ElementRef) {
    const elementToAnimate = (<HTMLElement>document.querySelector('.modal-wrapper'));
    this.heightModal = elementToAnimate.offsetHeight - 100;
    this.animation = this.animationCtrl.create()
      .addElement(elementToAnimate)
      .easing('linear')
      .duration(500)
      .fromTo('transform', 'translateY(55%)', `translateY(${this.MAX_TRANSLATE}%)`);

    this.gesture = this.gestureCtrl.create({
      el: header.nativeElement,
      threshold: 0,
      gestureName: 'square-drag',
      onMove: (ev) => { this.onMove(ev); },
      onEnd: (ev) => { this.onEnd(ev); }
    });
    this.gesture.enable(true);
  }

  private onMove(ev) {
    this.close=false;
    if (!this.started) {
      this.animation.progressStart();
      this.started = true;
    }
    this.animation.progressStep(this.getStep(ev))
  }
  private onEnd(ev) {
    const step = this.getStep(ev);
    if (ev.velocityY > 0.2) {
      this.animation
      .progressEnd(1, step, 250)
      .onFinish(() => { this.closeModal()});
    }
    else {
      if (!this.started) { return; }
      this.gesture.enable(false);
      const shouldComplete = step > 0.45;
      this.animation
        .progressEnd((shouldComplete) ? 1 : 0, step)
        .onFinish(() => {
          if (shouldComplete) {
            this.closeModal()
          }
          this.gesture.enable(true);
          this.close=true;
        });
      this.started = false;
    }
  }

  private clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
  }

  private getStep(ev) {
    return this.clamp(0, ev.deltaY * 1 / this.heightModal, 1) - 0.1;
  }

  closeModalSwipe(step: any) {
    if(this.close){
    this.animation
      .progressEnd(1, step, 250)
      .onFinish(() => { this.closeModal() });
    }

  }

  private closeModal() {
    this.modalController.dismiss();
  }

}
