import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, addDoc, collection, collectionData, doc, onSnapshot,updateDoc } from '@angular/fire/firestore';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  game;
  gamesId: string = '';
  currentCard: string = '';

  constructor(private route: ActivatedRoute, public dialog: MatDialog,) {
    this.game = new Game();
    this.route.params.subscribe((params) => {
    this.gamesId = params["id"];

    let selectedGame = this.getSingleGame("games", params["id"]);
    console.log(this.gamesId)
      
    onSnapshot(selectedGame, (game: any) => {
        this.game.currentPlayerImgs = game.data().currentPlayerImgs,
          this.game.stack = game.data().stack,
          this.game.playedCards = game.data().playedCards,
          this.game.players = game.data().players,
          this.game.currentPlayer = game.data().currentPlayer,
          this.game.playersImg = game.data().playersImg

      });
    });

    this.addGame();
  }

  ngOnInit(): void {
    // this.newGame();
    console.log(this.game)
  }

  ngOnDestroy() {
    // this.unSubGame();
  }

  async addGame() {
    await addDoc(this.getGamesRef(), this.game.toJson());
  }

  async saveGame() {
    const gameDoc = this.getSingleGame("games", this.gamesId);
  
    try {
      await updateDoc(gameDoc, this.game.toJson());
      console.log("Spiel erfolgreich gespeichert.");
    } catch (error) {
      console.error("Fehler beim Speichern des Spiels:", error);
    }
  }
  

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleGame(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId)
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';//nimmt das letzte objekt vom array
      this.pickCardAnimation = true;
      this.saveGame();

      console.log(this.game);

      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log(this.game.currentPlayer);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1200);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((newPlayer: { name: string, img: string }) => {
      if (newPlayer && newPlayer.name.length > 0 && newPlayer.img.length > 0) {
        this.game.players.push(newPlayer.name);
        this.game.currentPlayerImgs.push(newPlayer.img);
        this.saveGame();
      }
    });
  }
}


