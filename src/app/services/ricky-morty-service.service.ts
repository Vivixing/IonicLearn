import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyServiceService {

  rutaPersonajes: string = 'https://rickandmortyapi.com/api/character';
  rutaPersonaje: string = 'https://rickandmortyapi.com/api/character/';
  rutaLugares: string = 'https://rickandmortyapi.com/api/location';
  
  constructor(public http: HttpClient) {  }

  loadCharacters(){
    return this.http.get(this.rutaPersonajes);
  }

  loadLocations(){
    return this.http.get(this.rutaLugares);
  }
  
  loadCharacter(id: string){  
    return this.http.get(this.rutaPersonaje + id);
  }
}
