import { Component } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Variable donde se manejan los personajes
  personajes:any[]=[];

  //Injección de dependencias del servicio
  constructor(private bd:RickyMortyBdService) {}

  ngOnInit(){
    //Aquí se realliza la carga de los personajes
    this.cargarPersonajes();
  }

  //Método que se ejecuta al cargar la página
  async cargarPersonajes(){
    await this.bd.getAllPersonajes().toPromise().then((res:any)=>{
      this.personajes=res.results;
      console.log('MISPERSONAJES',this.personajes);
    });
  }

}
