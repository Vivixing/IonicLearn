import { Component, OnInit } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
})
export class BarcodeScannerPage implements OnInit {

   //Barcodescanner
   isSupported = false;
   barcodes: Barcode[] = [];
   coordenadas: Position[] = [];

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  //Método para obtener la ubicación
  async printCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coordenadas.push(coordinates);
    console.log('Current position:', coordinates);
  };

  //Método para visualizar la ubicación en tiempo real de la lista de coordenadas
  async watchPosition() {
    const wait = Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error('Could not fetch position', err);
        return;
      }
      console.log('Watch position:', position);
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
    this.printCurrentPosition();
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
