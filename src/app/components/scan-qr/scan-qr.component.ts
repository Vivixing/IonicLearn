import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CamaraComponent } from '../camara/camara.component';
import { LensFacing,BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';


@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQRComponent  implements OnInit {

  segmento = 'escanear';
  qrTexto = '';
  scanResultado = '';
  personaje:any;
  estado=false;


  constructor(
    private loadingController: LoadingController, 
    private modalController: ModalController,
    private toastController: ToastController,
    private rickyMortyBdService: RickyMortyBdService

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

    if(data){
      this.scanResultado = data?.barcode?.displayValue;
      if(this.esUrl()){
      this.openPersonaje();
      }
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
        this.openPersonaje();
        }
  }


  capturarPantalla(){
    const elememnt=document.getElementById('qrImagen') as HTMLElement;
    html2canvas(elememnt).then((canvas: HTMLCanvasElement)=>{
      this.descargarImagen(canvas);
    })
}


  async descargarImagen(canvas: HTMLCanvasElement){
    let base64 = canvas.toDataURL();
    let path = 'qr.png';
    const loading = await this.loadingController.create({spinner: 'crescent'});
    await loading.present();
    
   
    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
        
    }).then(async(res)=>{

      let uri= res.uri;

      await Share.share({url: uri});

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
        })

      }).finally(()=>{
        loading.dismiss();
      });
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

esUrl(){
  let regex = /\.(com|net|io|me|crypto|ai)\b/i;
  return regex.test(this.scanResultado);

}


async openPersonaje(){
  
  let url = this.scanResultado;

  this.rickyMortyBdService.irAPersonaje(url).toPromise().then((resp:any)=>{
    this.personaje = resp;
    console.log("MI_PERSONAJE",this.personaje);
    console.log(this.estado)
    this.estado=true;
    
  });
}
  
}
