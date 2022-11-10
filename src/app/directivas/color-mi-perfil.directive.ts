import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColorMiPerfil]'
})
export class ColorMiPerfilDirective implements OnInit {

  constructor(private el: ElementRef) 
  {
    
  }
  ngOnInit(): void {
    this.highlight() 
  }

  @Input() appColorMiPerfil = '';


  private highlight() {

    switch(this.appColorMiPerfil)
    {
      case "admin":
        this.el.nativeElement.style.backgroundColor = "darkcyan";
        break;

      case "especialista":
        this.el.nativeElement.style.backgroundColor = "#1680be";
        break;

      case "paciente":
        this.el.nativeElement.style.backgroundColor = "#56baed";
        break;
    }
  }
}
