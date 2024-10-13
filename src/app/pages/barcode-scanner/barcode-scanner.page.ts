import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Router } from '@angular/router';

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

  constructor(private alertController: AlertController, private router:Router) { }

  ngOnInit() {
    this.installGoogleBarcodeScannerModule();
    // Verificar si el escáner es soportado en el dispositivo
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async installGoogleBarcodeScannerModule() {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };

  //Método para obtener la ubicación
  async printCurrentPosition() {
    try{
      const coordinates = await Geolocation.getCurrentPosition();
      this.coordenadas.push(coordinates); //Guarda la ubicación actual
      console.log('Current position:', coordinates);
    }catch(err){
      console.error('Could not fetch position', err);
    }
  }

  //Método para visualizar la ubicación en tiempo real de la lista de coordenadas
  async watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error('Could not fetch position', err);
        return;
      }
      if (position) {
        this.coordenadas.push(position); //Guarda la ubicación actual
        console.log('Watch position:', position);
      }
    });
  }

  //Método para scaneo
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
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

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
