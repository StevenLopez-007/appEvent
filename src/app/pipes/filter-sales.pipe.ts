import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSales'
})
export class FilterSalesPipe implements PipeTransform {

  transform(sales: Array<any>=[], filterBy:string,search:string=''): unknown {
    console.log(sales)
    console.log(filterBy)
    if(search==''){
      return sales
    }
    else{
    return sales.filter(sale=>{
      return sale[filterBy].toLowerCase().match(search.toLowerCase())
    });
  }
  }

}
