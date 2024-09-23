import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  favoriteCharacters:any[]=[];
  constructor(private storage:StorageService) {}

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  async cargarFavoritos(){
    this.favoriteCharacters = this.storage.getLocalPersonajes();
    console.log('FAVORITOS',this.favoriteCharacters);
  }
}
