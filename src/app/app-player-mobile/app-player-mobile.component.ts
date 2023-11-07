import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-app-player-mobile',
  templateUrl: './app-player-mobile.component.html',
  styleUrls: ['./app-player-mobile.component.scss']
})
export class AppPlayerMobileComponent {
  @Input() name: string = '';
  @Input() img: string = '';
  @Input() playerActive:boolean = false;
}
