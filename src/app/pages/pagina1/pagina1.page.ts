import { Component, OnInit} from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';


@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  personajes:any[] = [];//Lista de personajes
  url_next:string='';
  

  constructor(private rickyMortyService:RickyMortyBdService) {}

  ngOnInit() {
    this.cargarPersonajes();
  }

  //Método que se ejecuta al cargar la página
  async cargarPersonajes(){
    await this.rickyMortyService.getAllPersonajes().toPromise().then((res:any)=>{
      this.personajes=res.results;
      console.log('MISPERSONAJES',this.personajes);

      this.url_next=res.info.next;
      console.log('URL_NEXT',this.url_next);
    });
  }

  //Cargar personajes siguientes para el scroll infinito
  async cargarPersonajesSiguientes(){
    await this.rickyMortyService.getMorePersonajes(this.url_next).toPromise().then((res:any)=>{
      let masPersonajes = res.results;
      this.personajes.push(...masPersonajes);
      this.url_next=res.info.next;
      console.log('SiguientePersonaje',this.url_next);
    });
  }

  //Método que se ejecuta al hacer scroll
  onIonInfinite(ev:any) {
    this.cargarPersonajesSiguientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  
  handleInput(event:any){
    let txt = event.detail.value;
    console.log('TEXTO',txt);
    if(txt.length === 0){
      this.cargarPersonajes();
      return;
    }
    this.rickyMortyService.searchPersonajeByName(txt).subscribe((res:any) => {
      this.personajes = res.results;
    });
  }

}
