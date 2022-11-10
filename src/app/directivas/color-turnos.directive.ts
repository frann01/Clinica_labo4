import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorTurnos]'
})
export class ColorTurnosDirective implements OnInit {

  constructor(private el: ElementRef) 
  {
    
  }
  ngOnInit(): void {
    this.highlight() 
  }

  @Input() appColorTurnos = '';


  private highlight() {

    switch(this.appColorTurnos)
    {
      case "finalizado":
        this.el.nativeElement.style.backgroundColor = "#8cb1d4";
        break;

      case "cancelado":
        this.el.nativeElement.style.backgroundColor = "#c44343";
        break;

      case "rechazado":
        this.el.nativeElement.style.backgroundColor = "#c44343";
        break;

      case "aceptado":
          this.el.nativeElement.style.backgroundColor = "#8cd49f";
          break;


      case "pendiente":
        this.el.nativeElement.style.backgroundColor = "#cfcb57";
        break;
    }
  }

}
