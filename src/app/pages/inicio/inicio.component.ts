import { TurnosSrvService } from 'src/app/services/turnos-srv.service';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { slideInAnimation } from 'src/app/animations';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class InicioComponent implements OnInit {


  constructor(private contexts: ChildrenOutletContexts, private router:Router, public auth :AuthService, private toastr:ToastrService, public turnosSrv:TurnosSrvService, public base :BaseDatosService) 
  {
    
  }

  ngOnInit(): void {
  
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  salir(){ this.auth.LogOut();this.toastr.success("Usuario deslogueado!", 'Exito');
}
}
