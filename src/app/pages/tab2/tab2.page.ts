import { Component, OnInit } from '@angular/core';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  //Variable donde se maneja la lista de Ubicaciones
  ubicaciones:any[]=[];
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
    })
  }
  

}
