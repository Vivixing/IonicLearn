import { Component,Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.scss'],
})
export class LugarComponent  implements OnInit {

  @Input() lugar: any;
  @Input() personajes: any[] = [];

  constructor() { }

  ngOnInit() {}

}
