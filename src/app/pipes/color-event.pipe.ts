import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorEvent'
})
export class ColorEventPipe implements PipeTransform {
  colorsEvent=['#FFA868','#8A80F6','#F75A83','#9c27b0','#5e35b1'];
  transform(numberColors: any, ...args: any[]): any {
     var randomNumber =Math.floor(Math.random()*((this.colorsEvent.length-1)-0)+0)
     var color = this.colorsEvent[randomNumber];
    return color;
  }

}
