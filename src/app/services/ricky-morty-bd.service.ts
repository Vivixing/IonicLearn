import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_RM } from '../config/url.servicios';
import { map} from 'rxjs';

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
    
    getPersonajeId(id:number):any{
      let url = `${URL_RM}/character/${id}`;

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
  
}
