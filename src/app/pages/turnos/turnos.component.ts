import { Component, OnInit } from '@angular/core';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  constructor(private toastr: ToastrService,public base : BaseDatosService, public turnosSrv : TurnosSrvService, public auth : AuthService) { }

  turnosFiltrados:any[];

  mostrarFiltro:boolean=false;
  mostrarSelector:boolean=false
  mostrarFiltroEspecialistas:boolean=false;
  mostrarFiltroEspecialidades:boolean=false;
  mostrarFiltroPacientes:boolean=false;

  turnoSeleccionado:any;
  searchParam:string="";
  razon:string="";

  mostrarCancelar:boolean=false;

  ngOnInit(): void {
    this.turnosFiltrados = this.turnosSrv.turnos
    console.log(this.auth.pacientes)
  }


  MostrarCancelar(turno:any)
  {
    this.turnoSeleccionado = turno;
    this.mostrarCancelar = true
  }

  async CancelarTurno()
  {
    if(this.razon == "" || this.razon == null )
    {
      this.toastr.error("Debe agregar la razon", 'Error')
    }
    else
    {
      let razon = this.auth.UsuarioActivo.perfil +": "+this.razon
      await this.turnosSrv.cancelar(this.turnoSeleccionado, razon).then(()=>
      {
        this.mostrarCancelar = false;
        this.turnoSeleccionado = null
      })
    }
    
  }

  
  hacerBusqueda() {

    if (this.searchParam === "") {
      this.turnosFiltrados = this.turnosSrv.turnos;
      return;
    }

    const serachParamLower = this.searchParam.toLowerCase();
    this.turnosFiltrados = this.turnosSrv.turnos.filter(turno => this.doSearch(turno, serachParamLower));
  }

  doSearch(value, searcher) {
    if (typeof value === 'boolean') {
      return false;
    }

    if (typeof value === 'object') {
      for (let fieldKey in value) {
        if (!this.estaEnLaListaNegraDeKeys(fieldKey) && this.doSearch(value[fieldKey], searcher)) {
          return true;
        }
      }

      return false;
    }


    return (typeof value == "string" ? value.toLocaleLowerCase() : value.toString()).includes(searcher)
  }

  estaEnLaListaNegraDeKeys(key) {
    return ["especialidades", "foto", "foto1", "foto2"].indexOf(key) != -1
  }




}
