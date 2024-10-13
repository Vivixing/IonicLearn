import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import * as L from 'leaflet'; 

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {

  //Barcodescanner
  isSupported = false;
  barcodes: Barcode[] = [];
  //Arreglo para almacenar las coordenadas
  coordenadas: Position[] = [];
  map: any;  // Variable para almacenar el mapa de Leaflet
  currentMarker: any;  // Para almacenar el marcador actual

  constructor(private alertController: AlertController, private router:Router) { }

  ngOnInit() {
    this.installGoogleBarcodeScannerModule();
    // Verificar si el escáner es soportado en el dispositivo
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  ionViewDidEnter() {
    this.initializeMap(0, 0);  // Inicializa el mapa con coordenadas por defecto
  }

  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };

  //Método para scaneo y obtener la ubicación
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    try {
      const { barcodes } = await BarcodeScanner.scan(); // Escanea el código QR
  
      if (barcodes.length > 0) {
        const qrData = barcodes[0].displayValue; // Obtén el valor del QR escaneado
        // Verificar si el código ya existe en la lista de barcodes
        const exists = this.barcodes.some(barcode => barcode.displayValue === qrData);

        if (!exists) {
          // Si no existe, se agrega a la lista
          this.barcodes.push(...barcodes);
          console.log('Código escaneado y añadido:', qrData);
          this.showMapForScannedItem(); // Muestra el mapa

        } else {
          // Si ya existe, muestra una alerta o un mensaje
          this.presentMessage('El código ya fue escaneado anteriormente, no se agregará en la lista de Qr.');
        }

        // Asegúrate de que el QR tiene el formato adecuado (por ejemplo, un id de personaje)
        if (qrData) {
          const segments  = qrData.split('/');  // Divide la URL por "/"
          const characterId = segments.pop(); // Obtiene el último elemento (el ID)
          // Navega a la vista del personaje con el ID
        this.router.navigate([`/personaje/${characterId}`]);
        } else {
          this.presentAlertMessage('El código escaneado no contiene un ID válido.');
        }
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
      this.presentAlertMessage('Hubo un error al escanear el código.');
    }
  }

  // Obtener la ubicación actual y mostrar el mapa
  async showMapForScannedItem() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.coordenadas.push(coordinates); //Guarda la ubicación actual
      const lat = coordinates.coords.latitude;
      const lon = coordinates.coords.longitude;

      // Inicializar o actualizar el mapa con la ubicación actual
      this.initializeMap(lat, lon);
    } catch (err) {
      console.error('Error obteniendo la posición: ', err);
    }
  }

  // Inicializar el mapa (solo lo inicializa una vez)
  initializeMap(lat: number, lon: number) {
    const mapContainer = document.getElementById('map');
    if (mapContainer && !this.map) {
      // Solo inicializamos el mapa si no está ya inicializado
      this.map = L.map('map').setView([lat, lon], 13);

      // Capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    }
  }

  // Actualizar la posición del mapa y agregar marcador
  updateMap(lat: number, lon: number) {
    if (this.map) {
      // Si hay un marcador existente, lo removemos
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      // Agregar nuevo marcador en la ubicación actual
      this.currentMarker = L.marker([lat, lon]).addTo(this.map)
        .bindPopup('Ubicación de escaneo')
        .openPopup();

      // Centrar el mapa en la nueva ubicación
      this.map.setView([lat, lon], 13);

      // Forzar que el mapa se ajuste correctamente al tamaño de su contenedor
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
    }
  }


  // Método para mostrar alerta si el código es inválido
  async presentAlertMessage(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentMessage(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Message',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso Denegado',
      message: 'Por favor, conceda permiso a la cámara para utilizar el escáner de código de barras.',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
