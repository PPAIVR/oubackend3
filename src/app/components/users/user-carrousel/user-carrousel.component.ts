import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'anms-user-carrousel',
  templateUrl: './user-carrousel.component.html',
  styleUrls: ['./user-carrousel.component.css']
})

export class UserCarrouselComponent implements OnInit {
  @Input() pictures;
  imageSources: any = [];
  @ViewChild('slideshow') slideshow: ElementRef;


  constructor() { }

  ngOnInit() {
    this.imageSources = this.pictures;
  }


  goToPicture(index) {
    this.slideshow.goToSlide(index);
  }


}
