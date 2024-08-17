import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyServiceService } from 'src/app/services/ricky-morty-service.service';


@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

  nombrePersonaje: string = '';

  constructor(private activatedRoute:ActivatedRoute,
              private rickyandMortyService:RickyMortyServiceService
   ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.rickyandMortyService.loadCharacter(id).subscribe((res: any) => {
      this.nombrePersonaje = res.name;
    }, (error) => { 
      console.error(error); 
    });
  }

}
