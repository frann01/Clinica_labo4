import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  constructor(private toastr: ToastrService,public auth : AuthService) {
    console.log(auth.UsuarioActivo.especialidades)
   }

  comienzo:number;
  final:number

  ngOnInit(): void {
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

}
