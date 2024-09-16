import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Variable donde se manejan los personajes
  personajes:any[]=[];
  url_next:string='';

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

      this.url_next=res.info.next;
      console.log('URL_NEXT',this.url_next);
    });
  }

  //Cargar personajes siguientes para el scroll infinito
  async cargarPersonajesSiguientes(){
    await this.bd.getMorePersonajes(this.url_next).toPromise().then((res:any)=>{
      let masPersonajes = res.results;
      this.personajes.push(...masPersonajes);
      this.url_next=res.info.next;
      console.log('SiguientePersonaje',this.url_next);
    });
  }

  //Método que se ejecuta al hacer scroll
  onIonInfinite(ev:any) {
    this.cargarPersonajesSiguientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
