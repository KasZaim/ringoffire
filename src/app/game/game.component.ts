import { Component, OnInit, inject} from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { Firestore,collection, collectionData } from '@angular/fire/firestore';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  game;
  currentCard: string = '';

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    const aCollection = collection(this.firestore, 'games');
  }
  ngOnInit(): void {
    this.newGame();
    console.log(this.game)
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';//nimmt das letzte objekt vom array
      this.pickCardAnimation = true;
      
      console.log(this.game);
      
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log(this.game.currentPlayer);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1200);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((newPlayer: {name: string, img: string}) => {
      if (newPlayer && newPlayer.name.length > 0 && newPlayer.img.length > 0) {
        this.game.players.push(newPlayer.name);
        this.game.currentPlayerImgs.push(newPlayer.img);
      }
    });
  }
}


