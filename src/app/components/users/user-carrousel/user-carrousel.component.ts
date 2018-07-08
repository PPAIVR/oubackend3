import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SlideshowComponent} from "ng-simple-slideshow/src/app/modules/slideshow/slideshow.component";


@Component({
  selector: 'anms-user-carrousel',
  templateUrl: './user-carrousel.component.html',
  styleUrls: ['./user-carrousel.component.css']
})

export class UserCarrouselComponent implements OnInit {
  @Input() pictures;
  imageSources: any = [];
  //private slideshow: SlideshowComponent;
  @ViewChild('slideshow') slideshow: ElementRef;
  /*@ViewChild('slideshow') set controlElRef(elementRef: ElementRef) {
    this.slideshow = elementRef as SlideshowComponent;
  }*/


  constructor() { }

  ngOnInit() {
    this.imageSources = this.pictures;
  }


  goToPicture(index) {

    this.slideshow.goToSlide(index);

  }
}
