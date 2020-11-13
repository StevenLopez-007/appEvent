import { Directive, Input, SimpleChanges, ElementRef } from '@angular/core';
import { IonRefresher, IonContent } from '@ionic/angular';
@Directive({
    selector:'[refreshCtrl]'
})
export class RefreshControl{
    @Input('refreshCtrl') refresh:IonRefresher;
    
    constructor(private element:IonContent){

    }

    ngOnChanges(changes: SimpleChanges){
        this.element.scrollEvents=true;    }
}