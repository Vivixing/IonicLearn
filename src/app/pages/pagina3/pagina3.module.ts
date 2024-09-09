import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pagina3PageRoutingModule } from './pagina3-routing.module';

import { Pagina3Page } from './pagina3.page';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pagina3PageRoutingModule,
    ComponentsModule
],
  declarations: [Pagina3Page]
})
export class Pagina3PageModule {}
