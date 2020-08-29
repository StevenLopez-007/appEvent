import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderEventsPerDate'
})
export class OrderEventsPerDatePipe implements PipeTransform {

  transform(events: Array<any>): Array<any> {
    return events? events.sort((a,b):any=>{
      var a:any = new Date(a.fechaEvento);
      var b:any = new Date(b.fechaEvento);
      return b-a
    }):[];
  }

}
