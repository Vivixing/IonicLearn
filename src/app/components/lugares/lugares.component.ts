import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
})
export class LugaresComponent{

  @Input() listaLugares: any[] = [];
  @Input() titulo:string = '';
  @Input() subTitulo:string = '';
  constructor(private router:Router) { 
    
  }

  ngOnInit() {
    
  }

  irALugar(idLugar:number){
    console.log('IDLUGAR',idLugar);
    this.router.navigate(['/lugar',idLugar]);
  }


  
}
