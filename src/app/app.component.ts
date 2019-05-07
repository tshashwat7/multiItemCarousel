import { Component } from '@angular/core';
import { ViewEncapsulation, SimpleChanges, SimpleChange, EventEmitter, Renderer2, Input, Output, OnInit,AfterViewInit, ElementRef, HostListener , ViewChild} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None 

})
export class AppComponent implements OnInit , AfterViewInit{
  title = 'multiitem';
  constructor(private el : ElementRef){}
@ViewChild('MultiCarousel') MultiCarousel: ElementRef;
@ViewChild('MultiCarouselinner') MultiCarouselinner: ElementRef;
//initiallizing code
carouselInner;
 itemWidth:number;
 axis :number;
 multiCarouselInnerWidth :number;
 cardSlides :number;
 ispCardLists =['1' , '2' , '3' , '4' , '5' , '6']; /// total number of slides
 ngAfterViewInit(){
    this.carouselInner= this.MultiCarouselinner.nativeElement.children;
    this.cardSlidesCount();
    this.responsiveCarouselSize();
 }

ngOnInit(): void{   }
navButtonClicked(event) {
  if (event.target.classList.contains('leftLst')) {
      this.click(0, event);
  } else {
      this.click(1, event);
  }
}
click(ell, event) {
  let slide = this.cardSlides;
  this.responsiveCarousel(ell, slide, event);

}
responsiveCarousel(e, slide, event) {
  var translateXval;
  var divStyle = this.MultiCarouselinner.nativeElement.style.transform;
  var values = divStyle.match(/-?[\d\.]+/g);
  var xds = Math.abs(values[0]);
  if (e == 0) {
      translateXval = (xds) - (this.itemWidth * slide);
      (document.querySelector('.rightLst') as HTMLElement).classList.remove("over");

      if (translateXval <= this.itemWidth / 2) {
          translateXval = 0;
          (document.querySelector('.leftLst') as HTMLElement).classList.add("over");
      }
  } else if (e == 1) {
      var itemsCondition = this.MultiCarouselinner.nativeElement.offsetWidth - this.MultiCarousel.nativeElement.offsetWidth;
      translateXval = (xds) + (this.itemWidth * slide);
      (document.querySelector('.leftLst') as HTMLElement).classList.remove("over");
      if (translateXval >= itemsCondition - this.itemWidth / 2) {
          translateXval = itemsCondition;
          (document.querySelector('.rightLst') as HTMLElement).classList.add("over");

      }
  }
  this.axis = -1 * (translateXval);
}
responsiveCarouselSize() {
  let incno = 0;
  var id = 0;
  var btnParentSb = '';
  var itemsSplit;
  var sampwidth = this.MultiCarousel.nativeElement.offsetWidth;
  var bodyWidth = window.innerWidth;
  if(this.ispCardLists.length < 3){
      (document.querySelector('.MultiCarousel') as HTMLElement).classList.add("center-align");        
  }
  for (let ind = 0; ind < this.carouselInner.length; ind++) {
      id = id + 1;
      var itemNumbers = this.carouselInner.length;
      btnParentSb = this.MultiCarousel.nativeElement.getAttribute('data-items');
      itemsSplit = btnParentSb.split(',');
      if (bodyWidth >= 1200) {
          incno = itemsSplit[3];
          this.itemWidth = sampwidth / incno;
      }
      else if (bodyWidth >= 992) {
          incno = itemsSplit[2];
          this.itemWidth = sampwidth / incno;
      }
      else if (bodyWidth >= 576) {
          incno = itemsSplit[1];
          this.itemWidth = sampwidth / incno;
          this.cardSlides = 2;
      }
      else {
          incno = itemsSplit[0];
          this.itemWidth = sampwidth / incno;
          this.cardSlides = 1;
          (document.querySelector('.MultiCarousel') as HTMLElement).classList.remove("center-align");
      }
      this.multiCarouselInnerWidth = this.itemWidth * itemNumbers;
      this.multiCarouselInnerStyle();
      this.axis = 0;
      (document.querySelector('.leftLst') as HTMLElement).classList.add("over");
      (document.querySelector('.rightLst') as HTMLElement).classList.remove("over");
  }

}
onResize(event) {
  this.cardSlidesCount();
  this.responsiveCarouselSize();
}
multiCarouselInnerStyle(){ 
  let style = {
      'width' :  this.multiCarouselInnerWidth + 'px',
      'transform' :'translateX(' + this.axis + 'px)'
  }
  return style;
}
itemsStyle(){
  return {width : this.itemWidth + 'px'}
}
cardSlidesCount() {
  if (this.ispCardLists.length > 10) {
      this.cardSlides = 3;
  } else {
      this.cardSlides = 1;
  }
}



}
