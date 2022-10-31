import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; 
import { AnimateTimings } from '@angular/animations';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  constructor(private toastr: ToastrService, public turnosSrv : TurnosSrvService,public auth : AuthService) {
   }

  turnosFiltrados:any[];
  comienzo:number;
  final:number
  especialidades="";
   fecha:any;
  ngOnInit(): void {


    this.fecha = new Date();
    var dd = String(this.fecha.getDate()).padStart(2, '0');
    var mm = String(this.fecha.getMonth() + 1).padStart(2, '0');
    var yyyy = this.fecha.getFullYear();

    this.fecha = mm + '/' + dd + '/' + yyyy;



    if(this.auth.UsuarioActivo.perfil=="paciente")
    {
      this.turnosFiltrados = this.turnosSrv.turnos.filter(turno=> turno.paciente.uid == this.auth.UsuarioActivo.uid && turno.estado == "finalizado")
    }
    if(this.auth.UsuarioActivo.perfil=="especialista")
    {
      this.auth.UsuarioActivo.especialidades.forEach(element => {
        if(this.especialidades == "")
        {
          this.especialidades = element
        }
        else
        {
          this.especialidades += ", " + element
        }
      });
    }
  }

  cambiarHorarios()
  {
    if(this.comienzo == null ||this.final == null)
    {
      this.toastr.error("Debe llenar ambos campos", 'Error')
    }
    else
    {
      if(this.comienzo > 24 || this.comienzo < 1 || this.final > 24 || this.final < 1)
      {
        this.toastr.error("Los horarios deben encontrase entre 1 y 24!", 'Error')
      }
      else
      {
        this.toastr.success("Modificando", 'Exito');
        this.auth.cambiarHorariosEspecialista(this.comienzo, this.final)
      }
    }
    
  }

  imprimirPdf(id:string): void {
    const DATA = document.getElementById(id);
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 2,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 30;
        const bufferY = 30;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_perfil.pdf`);
      });
  }



}
