import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent implements OnInit {
  @Input() listaPersonajes: any[] = [];
  @Input() titulo:string = '';
  @Input() subTitulo:string = '';

  constructor() { 
    
  }

  ngOnInit() {
    
  }

  irAPersonaje(idPersonaje:number){
    console.log('IDPERSONAJE',idPersonaje);
  }

}
