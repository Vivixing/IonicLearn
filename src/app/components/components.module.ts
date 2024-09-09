import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { PersonajeComponent } from "./personaje/personaje.component";
import { PersonajesComponent } from "./personajes/personajes.component";
import { LugaresComponent } from "./lugares/lugares.component";
import { FavoritosComponent } from "./favoritos/favoritos.component";
import { LugarComponent } from "./lugar/lugar.component";

@NgModule({
  declarations: [
    PersonajeComponent, 
    PersonajesComponent, 
    LugaresComponent,
    LugarComponent,
    FavoritosComponent],
  imports: [
    CommonModule, 
    IonicModule,
    RouterModule],
  exports: [
    PersonajeComponent, 
    PersonajesComponent,
    LugaresComponent,
    LugarComponent,
    FavoritosComponent],
}) 
export class ComponentsModule {}