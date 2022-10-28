import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {

  private itemsCollection?: AngularFirestoreCollection<any>;
  public especialidades: any[] = [];
  constructor(private authService: AuthService,private afs: AngularFirestore) {this.cargarEspecialidades()}


  cargarEspecialidades() {

    this.itemsCollection = this.afs.collection<any>('especialidades');
    return this.itemsCollection.valueChanges().subscribe(especialidades =>
      {
        this.especialidades=[];
        especialidades.forEach(esp => {
          this.especialidades.push(esp);
        });
      })
  }

  agregarEspecialidades(especialidad: string) {
    let nuevaEspecialidad: any = {
      nombre: especialidad,
      foto:"https://firebasestorage.googleapis.com/v0/b/tpclinica-labo.appspot.com/o/logoEspecialidad.png?alt=media&token=9a3bf161-fbf7-437c-af28-700f5c1a0447"
    };

    return this.afs.collection('especialidades').add(nuevaEspecialidad);
  }

}
