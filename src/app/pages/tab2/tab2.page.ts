import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  //Variable donde se maneja la lista de Ubicaciones
  ubicaciones:any[]=[];
  url_next:string='';
  //Injección dependencias del servicio
  constructor(private bd:RickyMortyBdService) {}
  
  ngOnInit() {
    //Aquí se realiza la carga de las ubicaciones
    this.cargarUbicaciones();
  }

  async cargarUbicaciones(){
    await this.bd.getAllLocations().toPromise().then((res:any)=>{
      this.ubicaciones=res.results;
      console.log('MISUBICACIONES',this.ubicaciones);

      this.url_next=res.info.next;
      console.log('URL_NEXT',this.url_next);
    })
  }

  //Cargar ubicaciones siguientes para el scroll infinito
  async cargarUbicacionesSiguientes(){
    await this.bd.getMoreLugares(this.url_next).toPromise().then((res:any)=>{
      let masLugares = res.results;
      this.ubicaciones.push(...masLugares);
      this.url_next=res.info.next;
      console.log('SiguienteLugar',this.url_next);
    });
  }

  //Método que se ejecuta al hacer scroll
  onIonInfinite(ev:any) {
    this.cargarUbicacionesSiguientes();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  

}
