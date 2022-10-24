import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-boton-inicio',
  templateUrl: './boton-inicio.component.html',
  styleUrls: ['./boton-inicio.component.css']
})
export class BotonInicioComponent implements OnInit {

  constructor( public auth :AuthService) { }

  ngOnInit(): void {
  }

}
