import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
})
export class LugaresComponent  implements OnInit {

  listaLugares: any[] = []
  constructor(public servicioRickyMorty:RickyMortyServiceService) { }

  ngOnInit(  ) {
    this.cargarLugares();
  }

  cargarLugares(){
    this.servicioRickyMorty.loadLocations().subscribe((res:any)=>{
      this.listaLugares = res['results'];
    }, (error) => {
      console.error(error);
    });
  }
  
}
