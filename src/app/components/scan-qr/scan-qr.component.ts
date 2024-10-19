import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CamaraComponent } from '../camara/camara.component';
import { LensFacing,BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Clipboard } from '@capacitor/clipboard';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { Geolocation } from '@capacitor/geolocation';
import { StorageScanService } from 'src/app/services/storage-scan.service';
import { ScanItem } from 'src/app/models/scan-item.model';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQRComponent  implements OnInit {

  segmento = 'escanear';
  qrTexto = '';
  scanResultado = '';
  estado=false;
  personaje:any;
  position: any = {};


  constructor(
    private loadingController: LoadingController, 
    private modalController: ModalController,
    private toastController: ToastController,
    private rickyMortyBdService: RickyMortyBdService,
    private storageScanService: StorageScanService

  ) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then();
    BarcodeScanner.checkPermissions().then();
    BarcodeScanner.removeAllListeners();
  }


  async comenzarEscaneo() {
    const modal = await this.modalController.create({
    component: CamaraComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
        formats:[],
        LensFacing: LensFacing.Back
    }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      this.scanResultado = data?.barcode?.displayValue;
      this.position = await Geolocation.getCurrentPosition();

      // Esperar la respuesta antes de continuar
      const resp: any = await this.rickyMortyBdService.irAPersonaje(this.scanResultado).toPromise();
      this.personaje = resp;
      console.log("MI_PERSONAJE", this.personaje);

      const latitud = this.position.coords.latitude;
      const longitud = this.position.coords.longitude;
      const timestamp = Date.now();  // Obtener la fecha y hora actual del escaneo

      // Crear una nueva instancia de ScanItem con personaje, coordenadas y timestamp
      const scanItem = new ScanItem(this.personaje, latitud, longitud, timestamp);  
      console.log('ScanItem:', scanItem);

      // Guardar el escaneo usando el modelo actualizado
      await this.storageScanService.agregarEscaneado(scanItem);
      console.log('Escaneado almacenado:', scanItem);

      this.estado = true;
      console.log(this.estado); 
      
       // Capturar la foto y guardarla
       const photoPath = await this.tomarFoto(); // Captura la foto
       if (photoPath) {
         const fileName = `scan_${new Date().getTime()}`;
         this.capturarImagenDesdeUrl(photoPath, fileName);
       }
  }
}


esUrl(){
  let regex = /\.(com|net|io|me|crypto|ai)\b/i;
  return regex.test(this.scanResultado);
}

 // En tu método de escaneo
 async tomarFoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
  });

  return image.webPath; // Devuelve la ruta de la imagen capturada
}

async capturarImagenDesdeUrl(photoUrl: string, fileName: string) {
  try {
    const response = await fetch(photoUrl);
    const blob = await response.blob();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('No se pudo obtener el contexto del canvas');
      return; // Salir si no se puede obtener el contexto
    }

    const img = new Image();
    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      await this.descargarImagen(canvas, fileName);
    };
    
    img.src = URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error al capturar la imagen desde la URL:', error);
  }
}



async readBarcodesFromImage(){  
  const {files} = await FilePicker.pickImages();
  const path = files[0]?.path;
  if (!path) return;
  const {barcodes}= await BarcodeScanner.readBarcodesFromImage({
    path,
  formats:[]});
  this.scanResultado= barcodes[0]?.displayValue;
  if(this.esUrl()){
    this.rickyMortyBdService.irAPersonaje(this.scanResultado);
    }
}


writeToClipboard = async () => {
  await Clipboard.write({
    string: this.scanResultado
  });
  const toast = await this.toastController.create({
    message: 'Copiado al portapapeles',
    duration: 1000,
    color:'tertiary',
    icon: 'clipboard-outline',
    position: 'middle'
  });
  toast.present();
};


async descargarImagen(canvas: HTMLCanvasElement, fileName: string) {
  const base64 = canvas.toDataURL(); // Captura la imagen como base64
  const path = `${fileName}.png`; // Guarda con un nombre dinámico basado en el escaneo
  const loading = await this.loadingController.create({ spinner: 'crescent' });
  await loading.present(); 

  await Filesystem.writeFile({
    path,
    data: base64.split(',')[1], // Solo el contenido base64 sin el prefijo
    directory: Directory.Documents,  // Guarda la imagen en los documentos del dispositivo
  }).then(async(res) => {
    const uri = res.uri;

    // Compartir la imagen si es necesario
    await Share.share({ url: uri });
    
  }).finally(() => {
    loading.dismiss();
  });
}



  
}
