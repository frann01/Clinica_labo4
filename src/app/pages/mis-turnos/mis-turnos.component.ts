import { Component, OnInit } from '@angular/core';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  constructor(private toastr: ToastrService,public base : BaseDatosService, public turnosSrv : TurnosSrvService, public auth : AuthService) { }

  turnosFiltrados:any[];

  mostrarFiltro:boolean=false;
  mostrarSelector:boolean=false
  mostrarFiltroEspecialistas:boolean=false;
  mostrarFiltroEspecialidades:boolean=false;

  mostrarFinalizar:boolean=false;
  turnoSeleccionado:any;

  diagnostico:string="";
  comentario:string="";
  razon:string="";


  mostrarResena:boolean=false;

  mostrarCalificar:boolean=false;

  mostrarCancelar:boolean=false;


  ngOnInit(): void {
    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid)
    }
    else
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid)
    }
  }


  MostrarFiltro()
  { 
    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.mostrarFiltro=true;this.mostrarSelector=true;

    }
    else
    {
      this.mostrarFiltro=true;this.mostrarFiltroEspecialidades=true;

    }
  }
  MostrarFiltroEspecialidades(){ this.mostrarSelector=false; this.mostrarFiltroEspecialidades=true;}
  MostrarFiltroEspecialistas(){ this.mostrarSelector=false; this.mostrarFiltroEspecialistas=true;}
  QuitarFiltros()
  {
    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid)
    }
    else
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid)
    }
    this.mostrarFiltro=false;
    this.mostrarSelector=false;
  }
  SeleccionarFiltroEspecialista(uid:string)
  {
    this.mostrarFiltroEspecialistas=false;
    this.mostrarFiltro=false;
    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid &&
         turno.especialista.uid == uid)
    }
    else
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid &&
         turno.especialista.uid == uid)
    }
  }
  SeleccionarFiltroEspecialidades(desc:string)
  {
    this.mostrarFiltroEspecialidades=false;
    this.mostrarFiltro=false;
    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid 
        && turno.especialidad == desc)
    }
    else
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid 
        && turno.especialidad == desc)
    }

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


  async RechazarTurno(turno:any)
  {
    this.turnosSrv.rechazar(turno).then(()=>
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid)    })
  }

  
  async AceptarTurno(turno:any)
  {
    this.turnosSrv.aceptar(turno).then(()=>
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid)    })
  }

  MostrarFinalizar(turno:any)
  {
    this.turnoSeleccionado = turno;
    this.mostrarFinalizar = true
  }

  async Finalizar()
  {
    if(this.diagnostico == "" || this.comentario == "")
    {
      this.toastr.error("Debe llenar ambos campos", 'Error')
    }
    else
    {
      await this.turnosSrv.finalizar(this.turnoSeleccionado, this.comentario, this.diagnostico).then(()=>
      {
        this.turnoSeleccionado = null
        this.diagnostico = ""
        this.comentario = ""
        this.mostrarFinalizar = false
        this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid) 
      })
      
    }
  }

  MostrarResena(turno:any)
  {
    this.turnoSeleccionado = turno;
    this.mostrarResena = true
  }

  CerrarResena()
  {
    this.turnoSeleccionado = null;
    this.mostrarResena = false
  }

  MostrarCalificar(turno:any)
  {
    this.turnoSeleccionado = turno;
    this.mostrarCalificar = true
  }

  async Calificar()
  {
    if(this.comentario == "")
    {
      this.toastr.error("Debe llenar ambos campos", 'Error')
    }
    else
    {
      await this.turnosSrv.calificar(this.turnoSeleccionado, this.comentario).then(()=>
      {
        this.turnoSeleccionado = null
        this.comentario = ""
        this.mostrarCalificar = false
        this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid)
      })
      
    }
  }


}
