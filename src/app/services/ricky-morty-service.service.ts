import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyServiceService {

  path: string = 'https://rickandmortyapi.com/api/character';
  
  constructor(public http: HttpClient) {  }

  loadCharacters(){
    return this.http.get(this.path);
  }
}
