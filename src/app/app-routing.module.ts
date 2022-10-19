import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroEspecialistaComponent } from './pages/registro-especialista/registro-especialista.component';
import { LoginGuard } from './guards/login.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';
import { EspecialistaGuard } from './guards/especialista.guard';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registrar', component: RegisterComponent},
  {path:'registrar-especialista', component: RegistroEspecialistaComponent},
  
  {path:'inicio', component: InicioComponent, canActivate:[LoginGuard,EspecialistaGuard], children:
  [
    {path:'usuarios', component: UsuariosComponent, canActivate:[AdminGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
