import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  personajes:any[] = [];//Lista de personajes
  searchTxt:string = '';//Término de búsqueda
  personajesFiltrados:any[] = [];//Lista de personajes filtrados
  buscando:boolean = false;//Indicador de búsqueda

  constructor(private rickyMortyService:RickyMortyBdService) {}

  ngOnInit() {
  }

  // Método para cargar todos los personajes
  cargarPersonajes() {
    this.rickyMortyService.getAllPersonajes().subscribe((data: any) => {
      this.personajes = data.results;
    });
  }

  // Método para buscar personajes por nombre
  buscarPersonaje() {
    if (this.searchTxt.trim().length === 0) {
      // Si el campo de búsqueda está vacío, cargar todos los personajes
      this.cargarPersonajes();
      return;
    }
    this.buscando = true;
    this.rickyMortyService.searchPersonajeByName(this.searchTxt).subscribe((data: any) => {
      this.personajesFiltrados = data.results;
      this.buscando = false;
    }, (error: any) => {
      console.log('Error en la búsqueda', error);
      this.buscando = false;
      this.personajes = [];// Limpiar la lista si hay error en la búsqueda
    });
    
  }

}
