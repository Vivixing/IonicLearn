import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';



@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent implements OnInit {
  @Input() listaPersonajes: any[] = [];
  @Input() titulo:string = '';
  @Input() subTitulo:string = '';

  constructor(private router:Router) { 
    
  }

  ngOnInit() {

  }

  irAPersonaje(idPersonaje:number){
    console.log('IDPERSONAJE',idPersonaje);
    this.router.navigate(['/personaje',idPersonaje]);
  }

}
