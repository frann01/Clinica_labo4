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

  razon:string="";

  mostrarCancelar:boolean=false;

  ngOnInit(): void {
    this.turnosFiltrados = this.turnosSrv.turnos
    console.log(this.auth.pacientes)
  }

  MostrarFiltro()
  { 
    this.mostrarFiltro=true;this.mostrarSelector=true;
  }
  MostrarFiltroEspecialidades(){ this.mostrarSelector=false; this.mostrarFiltroEspecialidades=true;}
  MostrarFiltroEspecialistas(){ this.mostrarSelector=false; this.mostrarFiltroEspecialistas=true;}
  MostrarFiltroPacientes(){ this.mostrarSelector=false; this.mostrarFiltroPacientes=true;}

  QuitarFiltros()
  {
    this.turnosFiltrados = this.turnosSrv.turnos
    this.mostrarFiltro=false;
    this.mostrarSelector=false;
  }
  SeleccionarFiltroEspecialista(uid:string)
  {
    this.mostrarFiltroEspecialistas=false;
    this.mostrarFiltro=false;
    this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == uid)

  }
  SeleccionarFiltroEspecialidades(desc:string)
  {
    this.mostrarFiltroEspecialidades=false;
    this.mostrarFiltro=false;

    this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialidad == desc)


  }

  SeleccionarFiltroPaciente(paciente:any)
  {
    console.log(paciente)
    this.mostrarFiltroPacientes=false;
    this.mostrarFiltro=false;
    this.turnosFiltrados = this.turnosSrv.turnos.filter(turno => turno.paciente.uid == paciente.uid)
    console.log(this.turnosFiltrados)
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
        if(this.auth.UsuarioActivo.perfil=="paciente")
        {
          this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid)
        }
        else
        {
          this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid)
        }
        this.mostrarCancelar = false;
        this.turnoSeleccionado = null
      })
    }
    
  }


}
