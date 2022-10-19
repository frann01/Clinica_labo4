import { getFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;
  UsuarioActivo:any;
  uidUser="";
  private noAprobados?: AngularFirestoreCollection<any>;
  public noAprobadosA= [];

  private UsuariosColeccion?: AngularFirestoreCollection<any>;
  public usuarios: any[] = [];

  constructor(private toastr: ToastrService,public afAuth : AngularFireAuth,public afs: AngularFirestore,private router: Router) 
  {
    afAuth.authState.subscribe( user => (this.isLogged = user))
  }

  traerUsuarios()
  {
    this.UsuariosColeccion = this.afs.collection<any>('usuarios');
    return this.UsuariosColeccion.valueChanges().subscribe(usuarios =>
      {
        this.usuarios=[];
        usuarios.forEach(usuario => {
          this.usuarios.unshift(usuario);
        });

      })
  }
  
  async onLogin (user : any)
  {
    var retorno:any;
    retorno = await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    this.uidUser=retorno.user.uid

    if(retorno)
    {
      await (this.afs.collection('usuarios').doc(this.uidUser).get().toPromise().then(async (doc) =>{
        await this.afs.collection('usuarios').doc(this.uidUser).valueChanges().subscribe(async (usuario) =>{
          this.UsuarioActivo = usuario
          console.log(this.UsuarioActivo);
          await localStorage.setItem('user', JSON.stringify(user));
        })
      }));
    }

    return retorno;
  }

  async ChequearEmail(email:string) : Promise<boolean>
  {
    let flag=false;
    await this.afAuth.fetchSignInMethodsForEmail(email).then((result) => {
      if(result.length!=0)
      {
        flag = true;
      }
    });
    return flag;
  }

  async onRegisterEspecialista(user : any)
  {
    try
    {
      var foto = await this.subirArchivos(user.foto)

      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(async (cred) =>{

        await this.afs.collection('usuarios').doc(cred.user.uid).set({
          email:user.email,
          contrasena:user.password,
          nombre:user.nombre,
          apellido:user.apellido,
          edad:user.edad,
          especialidades:user.especialidad,
          dni:user.dni,
          foto: foto,
          uid:cred.user.uid,
          perfil:"especialista",
          aprobado:false
        })

        const usuario = await this.afAuth.currentUser;
        usuario.sendEmailVerification().then(()=>
        {
          console.log("Email enviado")
        }).catch((error) =>
        {
          console.log("Ocurrio un error")
        })

      })

      return true;
    }
    catch(error){console.log("Error en register", error);return false}
  }

  async onRegisterAdmin(user : any)
  {
    try
    {
      var foto = await this.subirArchivos(user.foto)

      await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(async (cred) =>{

        await this.afs.collection('usuarios').doc(cred.user.uid).set({
          email:user.email,
          contrasena:user.password,
          nombre:user.nombre,
          apellido:user.apellido,
          edad:user.edad,
          dni:user.dni,
          foto: foto,
          uid:cred.user.uid,
          perfil:"admin"
        }).finally(()=>
        {
          this.toastr.success("Usuario registrado!", 'Exito');
        })
      })

      return true;
    }
    catch(error){console.log("Error en register", error);this.toastr.error("Ocurrio un error al registrar!", 'Error')
    ;return false}
  }


  async onRegisterUsuario(user : any)
  {
    try
    {
      var foto1 = await this.subirArchivos(user.foto1)
      var foto2 = await this.subirArchivos(user.foto2)

        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(async (cred) =>{
          cred.user?.sendEmailVerification()
          await this.afs.collection('usuarios').doc(cred.user.uid).set({
            email:user.email,
            contrasena:user.password,
            nombre:user.nombre,
            apellido:user.apellido,
            edad:user.edad,
            obra:user.obra,
            dni:user.dni,
            foto: foto1,
            foto2: foto2,
            uid:cred.user.uid,
            perfil:"paciente"
          })
        })

        return true;
    }
    catch(error){console.log("Error en register", error);this.toastr.error("Hubo un error", 'Error');return false}
  }

  async subirArchivos(foto:any) : Promise<string>
  {
    var url: string = null
    const storage = getStorage();
    const storageRef = await ref(storage, `imagenes/${this.formatDate(new Date())}`)
    await uploadBytesResumable(storageRef, foto).then(async (snapshot)=>
    {
      await getDownloadURL(storageRef).then((downloadUrl) => 
      {
        url = downloadUrl
      })
    })

    return url
  }

  async RecuperarUsuario()
  {
    var retorno:any = false;
    var user = localStorage.getItem('user');
    if(user)
    {
      var Usuario = JSON.parse(user)
      retorno = await this.afAuth.signInWithEmailAndPassword(Usuario.email, Usuario.password)
      this.uidUser=retorno.user.uid
      if(retorno)
      {
        await (this.afs.collection('usuarios').doc( this.uidUser).get().toPromise().then(doc =>{
          this.afs.collection('usuarios').doc( this.uidUser).valueChanges().subscribe(usuario =>{
            this.UsuarioActivo = usuario
          })
        }));
      }
      else
      {
        retorno=null;
      }
    }
    
    
    return retorno;
  }

  LogOut()
  {
    localStorage.removeItem('user')
    this.afAuth.signOut();
    this.router.navigate(['']);
  }

  formatDate = (date: any) => {
    return date.toLocaleString()
  }

  ObtenerNoAprobados()
  {
    this.noAprobados = this.afs.collection('usuarios', ref => ref.where('aprobado', '==', false))
    return this.noAprobados.valueChanges().subscribe(aprobados =>
      {
        this.noAprobadosA = []
        aprobados.forEach(a => {
          this.noAprobadosA.unshift(a);
        });

      })
  }

  aprobarEspecialista(uid:string)
  {
    this.afs.collection('usuarios').doc(uid).update({aprobado:true}).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al actualizar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Usuario aprobado!", 'Exito');
    })
  }

}
