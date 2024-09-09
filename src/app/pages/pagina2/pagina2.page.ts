import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  unIdPersonaje!:number;
  personaje:any;

  constructor(private activatedRoute:ActivatedRoute,
              private rickyMortyService:RickyMortyBdService) {
    this.activatedRoute.params.subscribe((params) => {    
      this.unIdPersonaje = params['id'];
      console.log("IdPersonaje_page2:",this.unIdPersonaje);
      this.cargarPersonajeId();
    });
  }
  
  ngOnInit() {
  }

  async cargarPersonajeId(){
    await this.rickyMortyService.getPersonajeId(this.unIdPersonaje).toPromise().then((resp:any)=>{
      this.personaje = resp;
      console.log("MI_PERSONAJE",this.personaje);
    })
  }
}
