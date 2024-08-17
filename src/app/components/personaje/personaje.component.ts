import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';


@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss'],
})
export class PersonajeComponent  implements OnInit {

  idPersonaje!: string;
  personaje: any;

  constructor(private activatedRoute:ActivatedRoute, 
              private rickyandMortyService:RickyMortyServiceService) { }

  ngOnInit() {
    this.idPersonaje = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.rickyandMortyService.loadCharacter(this.idPersonaje).subscribe((res: any) => {
      this.personaje = res;
    }, (error) => { 
      console.error(error); 
    });
  }

}
