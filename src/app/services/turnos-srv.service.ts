import { getFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import * as firebase from 'firebase/compat';
import { Subscription } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TurnosSrvService {

  private Turnos?: AngularFirestoreCollection<any>;
  public turnos: any[] = [];
  promiseTurnos:Subscription


  constructor(private toastr: ToastrService,public afAuth : AngularFireAuth,public afs: AngularFirestore,private router: Router) 
  {
    this.traerTurnos()
  }

  async agregarTurno(turno:any)
  {
    let uid = this.afs.createId()
    turno.uid = uid
    await this.afs.collection('turnos').doc(uid).set(turno).catch((err) =>
    {
      this.toastr.error("Ocurrio un error al reservar el turno", 'Error')

    }).then(()=>
    {
      this.toastr.success("El truno fue reservado")
    })

  }

  traerTurnos()
  {

    this.turnos = []
    this.Turnos =  this.afs.collection('turnos')
    this.promiseTurnos = this.Turnos.valueChanges().subscribe(esp =>
    {
      this.turnos = esp
    })
  }

  desSubscribir()
  {
    this.promiseTurnos.unsubscribe()
  }

  async cancelar(turno:any, razon :string)
  {
    await this.afs.collection('turnos').doc(turno.uid).update({estado:"cancelado",razon_cancelacion: razon}).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al cancelar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Turno cancelado!", 'Exito');
    })
  }


  async rechazar(turno:any)
  {
    await this.afs.collection('turnos').doc(turno.uid).update({estado:"rechazado"}).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al rechazar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Turno rechazado!", 'Exito');
    })
  }

  
  async aceptar(turno:any)
  {
    await this.afs.collection('turnos').doc(turno.uid).update({estado:"aceptado"}).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al aceptar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Turno aceptado!", 'Exito');
    })
  }

  async finalizar(turno:any, comentario:string, diagnostico:string, historial:any)
  {
    await this.afs.collection('turnos').doc(turno.uid).update({

      estado:"finalizado",
      comentario_especialista:comentario,
      diagnostico:diagnostico,
      historial:historial

    }).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al finalizar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Turno finalizado!", 'Exito');
    })
  }

  async calificar(turno:any, comentario:string)
  {
    await this.afs.collection('turnos').doc(turno.uid).update({
      comentario_usuario:comentario
    }).catch((err)=>
    {
      this.toastr.error("Ocurrio un error al calificar!", 'Error')
    }).finally(()=>
    {
      this.toastr.success("Turno calificado!", 'Exito');
    })
  }
}
