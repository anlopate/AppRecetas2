import { Component } from '@angular/core';
import {Receta} from '../receta'
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  recetaEditando = {} as Receta;
  arrayColeccionRecetas: any = [{
    id: "",
    receta: {} as Receta
  }];
  idRecetaSelec: string = "";

  constructor(private firestoreService: FirestoreService) {
    this.obtenerListaRecetas();
  }

  clicBotonInsertar() {
    //this.firestoreService.insertar("recetas", this.recetaEditando);
    this.firestoreService.insertar("recetas", this.recetaEditando).then(() => {
      console.log('Receta creada correctamente!');
      this.recetaEditando= {} as Receta;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaRecetas() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar("recetas").subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionRecetas = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosReceta) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionRecetas.push({
          id: datosReceta.payload.doc.id,
          tarea: datosReceta.payload.doc.data()
        })
      });
    });
  }

  selecReceta(idReceta:string, recetaSelec:Receta) {
    this.recetaEditando = recetaSelec;
    this.idRecetaSelec = idReceta;
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("recetas", this.idRecetaSelec).then(() => {
      console.log('Receta borrada correctamente!');
      this.recetaEditando= {} as Receta;
      this.idRecetaSelec = "";
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonModificar() {
    this.firestoreService.modificar("recetas", this.idRecetaSelec, this.recetaEditando).then(() => {
      console.log('Receta modificada correctamente!');
    }, (error) => {
      console.error(error);
    });
  }

}
