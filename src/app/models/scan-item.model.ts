export class ScanItem {
    personaje: any;  // Datos del personaje desde la API de Rick y Morty
    coordenadas: { latitud: number; longitud: number };  // Coordenadas de escaneo
    timestamp: number;  // Fecha y hora del escaneo (en formato UNIX)
  
    constructor(personaje: any, latitud: number, longitud: number, timestamp: number) {
      this.personaje = personaje;
      this.coordenadas = { latitud, longitud };
      this.timestamp = timestamp;
    }
  }
  