import { Component, OnInit,inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore,addDoc,collection} from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { GameComponent } from '../game/game.component';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router){
  }

ngOnInit(): void {
  
}

newGame(){
  let game = new Game();
  this.startGameByID(game)

}

startGameByID(game:any){
  addDoc(this.getGamesRef(),game.toJson()).then((gameInfo:any) =>{
    this.router.navigateByUrl('/game/'+ gameInfo.id)
  })
}

getGamesRef() {
  return collection(this.firestore, 'games');
}

}
