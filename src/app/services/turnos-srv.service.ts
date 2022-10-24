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
export class TurnosSrvService {

  private Turnos?: AngularFirestoreCollection<any>;
  public turnos: any[] = [];

  constructor(private toastr: ToastrService,public afAuth : AngularFireAuth,public afs: AngularFirestore,private router: Router) 
  {
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
    this.Turnos.valueChanges().subscribe(esp =>
    {
      esp.forEach(a => {
        this.turnos.unshift(a);
      });
         
    })
  }

}
