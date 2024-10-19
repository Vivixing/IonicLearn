import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScanItem } from '../models/scan-item.model';  // Importa el modelo

@Injectable({
  providedIn: 'root'
})
export class StorageScanService {
  private _storage: Storage | null = null;
  // Ahora _escaneados es un array de ScanItem
  private _escaneados: ScanItem[] = [];
  // BehaviorSubject también maneja ScanItem
  private escaneadosSubject: BehaviorSubject<ScanItem[]> = new BehaviorSubject<ScanItem[]>([]);

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializar el almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadEscaneados();  // Cargar los escaneados guardados
  }

  // Cargar la lista de escaneados desde el almacenamiento local
  async loadEscaneados() {
    try {
      const escaneados = await this._storage?.get('escaneados');
      if (escaneados) {
        this._escaneados = escaneados;
        this.escaneadosSubject.next(this._escaneados);  // Emitir los datos cargados
      }
    } catch (error) {
      console.error('Error al cargar escaneados', error);
    }
  }

  // Método para agregar un nuevo ScanItem
  async agregarEscaneado(scanItem: ScanItem) {
    console.log('Inicio Agregando escaneado', scanItem);

    this._escaneados = [scanItem, ...this._escaneados];  // Añadir a la lista de escaneados

    // Guardar la lista actualizada en el almacenamiento
    await this._storage?.set('escaneados', this._escaneados);

    // Emitir la lista actualizada a través del Subject
    this.escaneadosSubject.next(this._escaneados);

    console.log('fin Escaneado agregado', this._escaneados);
  }

  // Método para obtener un Observable de la lista de escaneados
  getEscaneados(): Observable<ScanItem[]> {
    return this.escaneadosSubject.asObservable();
  }

  // Método para obtener la lista directamente
  getEscaneadosDirectamente(): ScanItem[] {
    return [...this._escaneados];
  }

  // Método para limpiar el almacenamiento de personajes escaneados
  async limpiarEscaneados() {
    this._escaneados = [];
    await this._storage?.set('escaneados', this._escaneados);
    this.escaneadosSubject.next(this._escaneados);  // Emitir la lista vacía
  }
}
