import { Component, OnInit } from '@angular/core';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  constructor(public base : BaseDatosService, public turnosSrv : TurnosSrvService, public auth : AuthService) { }

  turnosFiltrados:any[];

  ngOnInit(): void {
    this.base.cargarEspecialidades()
    this.turnosSrv.traerTurnos()
  }



}
