import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';



@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent implements OnInit {
  @Input() listaPersonajes: any[] = [];
  @Input() titulo:string = '';
  @Input() subTitulo:string = '';

  constructor(private router:Router,
              private storageService:StorageService) { 
    
  }

  ngOnInit() {

  }

  irAPersonaje(idPersonaje:number){
    console.log('IDPERSONAJE',idPersonaje);
    this.router.navigate(['/personaje',idPersonaje]);
  }

  addFavorito(personaje:any){
    console.log('FavoritePersonaje',personaje);
    this.storageService.agregarRemoverPersonaje(personaje);
  }

  esFavorito(personaje:any):boolean{
    return this.storageService.personajeInFavoritos(personaje);
  }

}
