import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
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
import { LogRegBaseComponent } from './pages/log-reg-base/log-reg-base.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegistrosComponent } from './componentes/registros/registros.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { RegistroImgsComponent } from './componentes/registro-imgs/registro-imgs.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { NoAdminGuard } from './guards/no-admin.guard';
import { NoEspecialistaGuard } from './guards/no-especialista.guard';
import { PacientesComponent } from './pages/pacientes/pacientes.component';


const routes: Routes = [
  {path:'', component: LogRegBaseComponent, children:[
    {path:'', component: LoginComponent},
    {path:'seleccion-registro', component: RegistroImgsComponent},
    {path:'registro', component: RegistrosComponent, children:
    [
      {path:'', component: RegisterComponent},
      {path:'especialista', component: RegistroEspecialistaComponent}
    ]}
  ]},

  {path:'inicio', component: InicioComponent, canActivate:[LoginGuard,EspecialistaGuard], children:
  [
    {path:'usuarios', component: UsuariosComponent, canActivate:[AdminGuard], children:[
      {path:'usuario-registrar', component: RegisterComponent},
      {path:'admin-registrar', component: RegisterAdminComponent},
      {path:'especialista-registrar', component: RegistroEspecialistaComponent},
      {path:'listado', component: ListadoUsuariosComponent}
    ]},
    {path:'', component: BienvenidaComponent},
    {path:'mi-perfil', component: MiPerfilComponent},
    {path:'mis-turnos', component: MisTurnosComponent, canActivate:[NoAdminGuard]},
    {path:'sacar-turno', component: SolicitarTurnoComponent, canActivate:[NoEspecialistaGuard, NoAdminGuard]},
    {path:'turnos', component: TurnosComponent, canActivate:[AdminGuard]},
    {path:'pacientes', component: PacientesComponent, canActivate:[EspecialistaGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
