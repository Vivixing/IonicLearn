import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_RM } from '../config/url.servicios';
import { map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyBdService {

  constructor(//Inyección
    private http:HttpClient) { }

    getAllPersonajes():any{

      let url = `${URL_RM}/character`;
  
      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('PERSONAJES',res);
          return res;
        })
      );
    }

    searchPersonajeByName(txt:string): Observable<any>{
      let url = `${URL_RM}/character/?name=${txt}`; //Buscar personaje por nombre
      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('PERSONAJES_BUSCADOS',res);
          return res;
        })
      );
    }
    
    getPersonajeId(id:number):any{
      let url = `${URL_RM}/character/${id}`;

      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('PERSONAJE',res);
          return res;
        })
      );
    }
//ir a personaje escaneado, el scanner proporciona la url
    irAPersonaje(url:string):any{
    
      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('PERSONAJE',res);
          return res;
        })
      );
    }

    getAllLocations():any{
      let url = `${URL_RM}/location`;

      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('LOCATIONS',res);
          return res;
        })
      );
    }

    getLocationId(id:number):any{
      let url = `${URL_RM}/location/${id}`;

      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('LOCATION',res);
          return res;
        })
      );
    }

    getMorePersonajes(next_url:string):any{
      let url = `${URL_RM}/character`;

      if(next_url.length > 0){
        url = `${next_url}`
      }

      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('MOREPERSONAJES_PK',res);
          return res;
        })
      );
    }

    getMoreLugares(next_url:string):any{
      let url = `${URL_RM}/location`;

      if(next_url.length > 0){
        url = `${next_url}`
      }

      return this.http.get(url, {}).pipe(
        map((res: any) => {
          console.log('MORELOCATIONS_PK',res);
          return res;
        })
      );
    }
  
}
