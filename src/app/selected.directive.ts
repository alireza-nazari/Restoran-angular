import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnInit{

  constructor(el: ElementRef, renderer: Renderer2) {
      console.log(el.nativeElement)
   }
   ngOnInit(){
   }
}
