import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.page.html',
  styleUrls: ['./pagina3.page.scss'],
})
export class Pagina3Page implements OnInit {

  unIdLugar!: number;
  lugar: any;
  personajes: any[] = []; // Array para almacenar los personajes

  constructor(
    private activatedRoute: ActivatedRoute,
    private rickyMortyService: RickyMortyBdService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.unIdLugar = params['id'];
      console.log('IdLugar_page3:', this.unIdLugar);
      this.cargarLugarId();
    });
  }

  ngOnInit() {}

  async cargarLugarId() {
    await this.rickyMortyService.getLocationId(this.unIdLugar).toPromise().then((resp: any) => {
      this.lugar = resp;
      console.log('MI_LUGAR', this.lugar);
      this.cargarPersonajes(); // Llamar a cargarPersonajes después de obtener el lugar
    });
  }

  async cargarPersonajes() {
    if (this.lugar && this.lugar.residents.length > 0) {
      const personajesIds = this.lugar.residents.map((url: string) => url.split('/').pop());
      const personajesPromises = personajesIds.map((id: number) => 
        this.rickyMortyService.getPersonajeId(id).toPromise()
      );
  
      // Esperamos todas las llamadas a la API de personajes
      Promise.all(personajesPromises).then((personajesData: any[]) => {
        this.personajes = personajesData;
        console.log('Personajes cargados:', this.personajes);
      }).catch(err => {
        console.error('Error al cargar personajes:', err);
      });
    }
  }
  
}
