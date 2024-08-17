import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';


@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent  implements OnInit {
  listaPersonajes: any[] = [];
  constructor(public servicioRickyMorty:RickyMortyServiceService) { 
    for (let i = 0; i < 20; i++) {
      this.listaPersonajes.push(this.listaPersonajes.length);
    }
  }

  ngOnInit() {
    this.cargarPersonajes();
  }

  cargarPersonajes(){
    this.servicioRickyMorty.loadCharacters().subscribe((res: any) => {
      this.listaPersonajes = res.results;
    }, (error) => {
      console.error(error);
    });
  }

  cargarScroll(infiniteScroll: any){
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        this.listaPersonajes.push( this.listaPersonajes.length );
      }
      infiniteScroll.target.complete();
    }, 500);
  }
}
