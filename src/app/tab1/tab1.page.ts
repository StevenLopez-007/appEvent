import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slideOptions={
    slidesPerView:1,
    initialSlide:1,
    spaceBetween:-85,
    // width:350
  }
  constructor() {}

}
