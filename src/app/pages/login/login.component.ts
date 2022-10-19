import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public forma!: FormGroup;
  user:any= {};
  constructor( private authService:AuthService,
    private fb: FormBuilder,
    private router : Router,
    private toastr: ToastrService) 
    {
      this.forma = this.fb.group({
      'email': ['', Validators.required],
      'contrasena': ['', Validators.required]
    }); 
    }

  ngOnInit(): void {
  }

  async Ingresar()
  {
    this.toastr.success("Ingresando!", 'Exito');

    this.user.email=this.forma.get('email')!.value;
    this.user.password = this.forma.get('contrasena')!.value;
        
    try
    {
      const user = await this.authService.onLogin(this.user)
      if(user)
      {
        console.info("usuario encontrado: ", user);
        this.toastr.success("Ingreso exitoso!", 'Exito');
        setTimeout(() => {
          this.router.navigate(['inicio']);
        }, 500);
      }
      else
      {
        this.toastr.error("Usuario y/o contraseña incorrectos", 'Error')
      }
    }
    catch(error)
    {
      this.toastr.error("Usuario y/o contraseña incorrectos", 'Error')
    }
  }

  registrar()
  {
    this.router.navigateByUrl("registrar")
  }

}
