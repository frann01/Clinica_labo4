import { Component, OnInit } from '@angular/core';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public forma!: FormGroup;

  constructor(private toastr: ToastrService,public base : BaseDatosService, private fb: FormBuilder, public turnosSrv : TurnosSrvService, public auth : AuthService)
  {
    this.forma = this.fb.group({
      'comentario': ['', [Validators.required]],
      'diagnostico': ['', [Validators.required]],
      'peso': ['', [Validators.required, Validators.min(1)]],
      'altura': ['', [Validators.required, Validators.min(1)]],
      'presion': ['', [Validators.required, Validators.min(1)]],
      'temperatura': ['', [Validators.required, Validators.min(1)]],
      'clave': [''],
      'valor': [''],
    });
  }

  turnosFiltrados:any[];
  turnosFiltradosUsuario:any[];
  mostrarFiltro:boolean=false;
  mostrarSelector:boolean=false
  mostrarFiltroEspecialistas:boolean=false;
  mostrarFiltroEspecialidades:boolean=false;

  mostrarFinalizar:boolean=false;
  turnoSeleccionado:any;
  searchParam:string="";

  diagnostico:string="";
  comentario:string="";
  razon:string="";

  datosDinamicos:any = []
  clave:string="";
  valor :string="";
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

  agregarDatosDinamicos()
  {
    this.datosDinamicos.push({
      clave:this.forma.get('clave')!.value,
      valor:this.forma.get('valor')!.value
    })
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
    if(this.forma.invalid)
    {
      this.toastr.error("Debe llenar todos los campos correctamente", 'Error')
    }
    else
    {
      let datosHistorial= 
      {
        peso:this.forma.get('peso')!.value,
        altura:this.forma.get('altura')!.value,
        presion:this.forma.get('presion')!.value,
        temperatura:this.forma.get('temperatura')!.value,
        datosDinamicos: this.datosDinamicos
      }
      await this.turnosSrv.finalizar(this.turnoSeleccionado, this.forma.get('comentario')!.value, this.forma.get('diagnostico')!.value, datosHistorial).then(()=>
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

  hacerBusqueda() {

    if (this.searchParam === "") {
      if(this.auth.UsuarioActivo.perfil=="paciente")
      {
        this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid )
      }
      else
      {
        this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid )
      }
      return;
    }

    const serachParamLower = this.searchParam.toLowerCase();
    if(this.auth.UsuarioActivo.perfil=="paciente")
      {
        this.turnosFiltradosUsuario = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid )
      }
      else
      {
        this.turnosFiltradosUsuario = this.turnosSrv.turnos.filter(turno=> turno.especialista.uid == this.auth.UsuarioActivo.uid )
      }
    this.turnosFiltrados = this.turnosFiltradosUsuario.filter(turno => this.doSearch(turno, serachParamLower));
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
