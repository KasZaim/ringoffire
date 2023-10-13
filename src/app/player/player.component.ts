import { Component,OnInit,Input } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: string = '';
  @Input() img: string = '';
  @Input() playerActive:boolean = false;
  

  constructor(){
    
  }
  ngOnInit(): void {
    
    
  }
  

}
