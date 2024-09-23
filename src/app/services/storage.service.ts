import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private _localPersonajes : any[] = [];
  private favoritosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

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

  // Método para obtener los personajes favoritos como un Observable
  getFavoritos(): Observable<any[]> {
    return this.favoritosSubject.asObservable();
  }

  // Método para cargar personajes favoritos desde el almacenamiento
  async loadFavoritePersonajes(){
    try{
      const personajes = await this._storage?.get('personajes');
      if(personajes){
        this._localPersonajes = personajes || [];
        this.favoritosSubject.next(this._localPersonajes); // Emitir los personajes cargados
      }
    }catch(error){
      console.log('Error al cargar personajes',error);
    }
  }

  //Método para verificar si un personaje ya está en favoritos
  personajeInFavoritos(personaje:any){
    return !! this._localPersonajes.find(localPersonaje => localPersonaje.id === personaje.id);
  }

  // Método para agregar o remover personajes de favoritos
  async agregarRemoverPersonaje(personaje:any){

    const existe = this.personajeInFavoritos(personaje);

    if(existe){
      this._localPersonajes = this._localPersonajes.filter(localPersonaje => localPersonaje.id !== personaje.id);
    } else {
      this._localPersonajes = [personaje, ...this._localPersonajes];
    }
    
    await this._storage?.set('personajes',this._localPersonajes);
    this.favoritosSubject.next(this._localPersonajes);
  }

  // Método para obtener los personajes directamente (sin observable)
  getLocalPersonajes(){
    return [...this._localPersonajes];
  }
}
