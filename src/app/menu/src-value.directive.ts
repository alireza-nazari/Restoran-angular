import { Directive, ElementRef, ViewChild} from '@angular/core';

@Directive({
  selector: '[appSrcValue]'
})
export class SrcValueDirective{
  constructor(private el: ElementRef) {
    console.log(el.nativeElement.getAttribute('src'))
  }

}
