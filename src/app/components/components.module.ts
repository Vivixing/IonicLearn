import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { PersonajeComponent } from "./personaje/personaje.component";
import { PersonajesComponent } from "./personajes/personajes.component";
import { LugaresComponent } from "./lugares/lugares.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { LugarComponent } from "./lugar/lugar.component";
import { ScanQRComponent } from "./scan-qr/scan-qr.component";
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { QrCodeModule } from 'ng-qrcode';
import { CamaraComponent } from "./camara/camara.component";




@NgModule({
  declarations: [
    PersonajeComponent, 
    PersonajesComponent, 
    LugaresComponent,
    LugarComponent,
    FavoritosComponent, 
    ScanQRComponent, 
    CamaraComponent
  ],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule,
    FormsModule ,
    QrCodeModule
  ],
  exports: [
    PersonajeComponent, 
    PersonajesComponent,
    LugaresComponent,
    LugarComponent,
    FavoritosComponent,
    ScanQRComponent,
    CamaraComponent
  ],
})
export class ComponentsModule {}
