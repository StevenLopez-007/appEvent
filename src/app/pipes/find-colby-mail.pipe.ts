import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findColbyMail'
})
export class FindColbyMailPipe implements PipeTransform {

  transform(colaboradores: Array<any>, mailCol:string,colaborador:Array<any>): unknown {
    if(colaborador.length>0){
      return colaborador
    }
    else{
      // console.log(colaboradores)
    return colaboradores.length>0?colaboradores.filter(col=>{
       return col['correo'].toLowerCase().match(mailCol.toLowerCase())
    }):[]
    }
  }

}
