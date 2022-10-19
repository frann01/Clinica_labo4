import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaGuard implements CanActivate {

  constructor(private autentificador : AuthService, private router:Router,private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificar()
  }

  verificar()
  {
    if(this.autentificador.UsuarioActivo.perfil == 'especialista')
    {
      if(this.autentificador.UsuarioActivo.aprobado == false)
      {
        this.toastr.error("Su perfil de especialista no ha sido aprobado por un administrador!", 'Error')
        this.autentificador.LogOut()
        return false;
      }
      else
      {
        return true;
      }
    }
    else
    {
      return true;
    }
  }
  
}
