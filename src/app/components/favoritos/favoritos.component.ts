import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent  implements OnInit {

  @Input() listaFavoritos: any[] = [];
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    // Suscribirse a los cambios en la lista de personajes favoritos
    this.storageService.getFavoritos().subscribe(personajes => {
      this.listaFavoritos = personajes;
    });
  }

  esFavorito(personaje:any):boolean{
    return this.storageService.personajeInFavoritos(personaje);
  }

  addFavorito(personaje:any){
    console.log('FavoritePersonaje',personaje);
    this.storageService.agregarRemoverPersonaje(personaje);
  }
}
