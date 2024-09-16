import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localPersonajes : any[] = [];

  constructor(private storage: Storage) {
    this.init();
   }

  
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavoritePersonajes();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  getLocalPersonajes(){
    return [...this._localPersonajes];
  }

  async loadFavoritePersonajes(){
    try{
      const personajes = await this._storage?.get('personajes');
      if(personajes){
        this._localPersonajes = personajes || [];
      }
    }catch(error){
      console.log('Error al cargar personajes',error);
    }
  }

  personajeInFavoritos(personaje:any){
    return !! this._localPersonajes.find(localPersonaje => localPersonaje.id === personaje.id);
  }

  async agregarRemoverPersonaje(personaje:any){

    const existe = this.personajeInFavoritos(personaje);

    if(existe){
      this._localPersonajes = this._localPersonajes.filter(localPersonaje => localPersonaje.id !== personaje.id);
    } else {
      this._localPersonajes = [personaje, ...this._localPersonajes];
    }
    
    this._storage?.set('personajes',this._localPersonajes);
  }
}
