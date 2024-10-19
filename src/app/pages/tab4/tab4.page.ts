import { Component, OnInit } from '@angular/core';
import { StorageScanService } from 'src/app/services/storage-scan.service';
import { ScanItem } from 'src/app/models/scan-item.model'; 

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  escaneados: ScanItem[] = []; // Cambiado a tipo ScanItem[]

  constructor(private storageScanService: StorageScanService) { }

  ngOnInit() {
    // Obtener los personajes escaneados cuando se cargue la página
    this.storageScanService.getEscaneados().subscribe(data => {
      this.escaneados = data; // Se asignan los datos directamente al arreglo escaneados
    });
  }
  // Método para formatear la fecha
  formatFecha(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  // Método para limpiar los escaneados
  limpiarEscaneados() {
    this.storageScanService.limpiarEscaneados().then(() => {
      this.escaneados = []; // Limpiar el arreglo local también
    });
  }
  
}

