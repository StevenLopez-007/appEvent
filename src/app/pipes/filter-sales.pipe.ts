import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSales'
})
export class FilterSalesPipe implements PipeTransform {

  transform(sales: Array<any>=[], filterPer:string,search:string=''): unknown {
    console.log(sales)
    console.log(filterPer)
    if(search==''){
      return sales
    }
    else{
    return sales.filter(sale=>{
      return sale[filterPer].toLowerCase().match(search.toLowerCase())
    });
  }
  }

}
