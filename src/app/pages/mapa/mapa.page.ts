import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { StorageScanService } from 'src/app/services/storage-scan.service';
import { ScanItem } from 'src/app/models/scan-item.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  private map: L.Map | undefined;
  escaneados: ScanItem[] = [];

  constructor(private storageScanService : StorageScanService) { }

  ngOnInit() {
    this.storageScanService.getEscaneados().subscribe(data => {
      this.escaneados = data;
      //console.log("**escaneados", this.escaneados);
      this.leafletMap();
    });
  }

  leafletMap() {
    // Centrar el mapa en la Universidad San Buenaventura Cali
    this.map = L.map('mapId', {
      center: [3.3422, -76.5306],
      zoom: 15,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors',
    }).addTo(this.map);

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 0);
  
    const customIcon = L.divIcon({
      className: 'custom-icon', // Clase CSS para aplicar estilos
      html: '<ion-icon name="location" style="font-size: 24px; color: red;"></ion-icon>', // Tu icono inline
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
  });
  
  this.escaneados.forEach(escaneado => {
      const lat = escaneado.coordenadas.latitud;
      const lng = escaneado.coordenadas.longitud;
  
      if (this.map) {
          const marker = L.marker([lat, lng], { icon: customIcon }).addTo(this.map)
              .bindPopup(`<b>${escaneado.personaje.name}</b><br>Fecha: ${new Date(escaneado.timestamp).toLocaleString()}`)
              .openPopup();
      }
  });
  
  }
  
  ionViewDidEnter() {
    if (this.map) {
      this.map.invalidateSize(); // Asegura que el mapa se renderice correctamente
    }
  }
}
