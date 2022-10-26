import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { ToastrService } from 'ngx-toastr';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent implements OnInit {

  constructor(private toastr: ToastrService,public auth : AuthService, public base : BaseDatosService, public turnosSrv :TurnosSrvService) { }

  flag_especialidad:boolean = false;
  flag_especialista:boolean = false;
  flag_Datos:boolean = false;
  mostrarSeleccion:boolean=true;

  especialidadSeleccionada:string=null;

  especialistaSeleccionado:any=null;

  public turnoSeleccionado: any;

  turnos:any[] = []

  especialistas:any[] = []
  especialidades:any[] = []



  ngOnInit(): void {
    this.especialidades = this.base.especialidades
    this.especialistas = this.auth.especialistas
  }

  mostrarEspecialistas()
  {
    this.mostrarSeleccion = false
    this.flag_especialista = true;
    console.log(this.especialistas)
  }

  mostrarEspecialidades()
  {
    this.mostrarSeleccion = false
    this.flag_especialidad = true;
  }


  seleccEspecialidad(especialidad:string)
  {
    this.especialidadSeleccionada=especialidad
    this.especialistas = this.auth.especialistas.filter( espe => espe.especialidades.includes(especialidad))
    this.flag_especialidad = false;
    if(this.especialistaSeleccionado != null)
    {
      this.crearTurnos()
      this.flag_Datos = true;
    }
    else
    {
      this.flag_especialista = true
    }
  }

  seleccEspecialista(especialista:any)
  {
    this.especialistaSeleccionado = especialista
    this.especialidades = this.base.especialidades.filter( espe => especialista.especialidades.includes(espe.nombre))
    this.flag_especialista = false

    if(this.especialidadSeleccionada != null)
    {
      this.crearTurnos()
      this.flag_Datos = true;
    }
    else
    {
      this.flag_especialidad = true
    }
  }

  crearTurnos()
  {
    console.log(this.turnosSrv.turnos)

    const comienzoHorario = this.especialistaSeleccionado.comienzoA
    const finalHorario = this.especialistaSeleccionado.finalA

    if ((finalHorario - comienzoHorario) <= 0) {
      this.toastr.error("El especialista no tiene horarios disponibles", 'Error')
      return;
    }

    let hoy = new Date();
    let dia = new Date();
    let manana = new Date();

    let horaEntrada;
    let horaSalida;
    let duracionTurno = 30;
    let turnoConFormato;

    let ultimoTurno;


    for (let contador = 1; contador <= 15; contador++) {
      if(dia.getDay() !== 0) {
        ultimoTurno = dia;

        ultimoTurno.setHours(finalHorario, 0);

        if (dia.getDay() == 6) {
          ultimoTurno.setHours(14, 0);
        }

        ultimoTurno = new Date(ultimoTurno.getTime() - duracionTurno * 60000);

        dia.setHours(comienzoHorario, 0);

        do {
          turnoConFormato = dia.toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', });

          if (this.estaElTurnoDisponible(turnoConFormato)) {
            this.turnos.push(turnoConFormato);
          }

          dia = new Date(dia.getTime() + duracionTurno * 60000);

        } while (dia <= ultimoTurno);
      }

      manana.setDate(manana.getDate() + 1);
      dia = manana;
    }
  }

  estaElTurnoDisponible(fecha) {
    return !(this.turnosSrv.turnos.filter(turno =>
      turno.especialista.uid == this.especialistaSeleccionado.uid &&
      turno.fecha == fecha &&
      ["aceptado", "pendiente"].indexOf(turno.estado) != -1).length);
  }

  seleccionarTurno(turno) {

    this.turnoSeleccionado={
      paciente:this.auth.UsuarioActivo,
      especialista:this.especialistaSeleccionado,
      fecha:turno,
      especialidad:this.especialidadSeleccionada,
      estado:'pendiente',
      diagnostico:"",
      comentario_especialista:"",
      comentario_usuario:"",
      razon_cancelacion:""
    }

    this.turnosSrv.agregarTurno(this.turnoSeleccionado);

    this.flag_especialidad = false;
    this.flag_especialista = false;
    this.flag_Datos = false;
    this.mostrarSeleccion=true;

  }


}
