import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
})
export class LugaresComponent{

  @Input() listaLugares: any[] = [];
  @Input() titulo:string = '';
  @Input() subTitulo:string = '';
  constructor() { }


  
}
