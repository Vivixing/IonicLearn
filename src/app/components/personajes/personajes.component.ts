import { Component, OnInit } from '@angular/core';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent  implements OnInit {
  
  usuarios: any[] = [];
  constructor(public http:RickyMortyServiceService) { }

  ngOnInit() {
    
  }

  cargarUsuarios(){
    this.http.loadCharacters().subscribe((res: any) => {
      this.usuarios = res['results'];
    }, (error) => {
      console.error(error);
    });
  }

 

}
