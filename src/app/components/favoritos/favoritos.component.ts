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

  ngOnInit() {}

  esFavorito(personaje:any):boolean{
    return this.storageService.personajeInFavoritos(personaje);
  }
}
