import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  constructor(private router:Router, public auth :AuthService, private toastr:ToastrService) 
  {
    
  }

  ngOnInit(): void {
  }

  salir(){ this.auth.LogOut();this.toastr.success("Usuario deslogueado!", 'Exito');
}
}
