import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, addDoc, collection, collectionData, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game;
  gamesId: string = '';
  gameOver = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,) {
    this.game = new Game();
    this.route.params.subscribe((params) => {
      this.gamesId = params["id"];
      if (this.gamesId) {
        let selectedGame = this.getSingleGame("games", params["id"]);
        console.log(this.gamesId)

        onSnapshot(selectedGame, (game: any) => {
          this.game.currentPlayerImgs = game.data().currentPlayerImgs,
            this.game.stack = game.data().stack,
            this.game.playedCards = game.data().playedCards,
            this.game.players = game.data().players,
            this.game.currentPlayer = game.data().currentPlayer,
            this.game.playersImg = game.data().playersImg
          this.game.currentCard = game.data().currentCard
          this.game.pickCardAnimation = game.data().pickCardAnimation

        });
      } else {
        console.error("Keine Spiel-ID in der URL gefunden.");
      }

    });
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
    if (this.game.players.length < 2) {
      alert("Es müssen mindestens zwei Spieler vorhanden sein, um eine Karte zu ziehen.");
      return; // Frühzeitige Rückkehr, wenn keine Spieler vorhanden sind
    }
    else if (this.game.stack.length == 0) {
      this.gameOver = true;
    }
    else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';//nimmt das letzte objekt vom array
      this.game.pickCardAnimation = true;

      console.log(this.game);

      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
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

  editPlayer(playerId: number): void {
    const playerToEdit = {
      name: this.game.players[playerId],
      img: this.game.currentPlayerImgs[playerId],
      availableImgs: this.game.playersImg
    };

    const dialogRef = this.dialog.open(EditPlayerComponent, {
      width: '250px',
      data: playerToEdit // Übergeben Sie die aktuellen Spielerdaten an den Dialog
    });

    dialogRef.afterClosed().subscribe((result: { name?: string, img?: string, delete?: boolean }) => {
      if (result?.delete) {
        // Löschen Sie den Spieler aus dem Spielobjekt
        this.game.players.splice(playerId, 1);
        this.game.currentPlayerImgs.splice(playerId, 1);
        // Speichern Sie die aktualisierten Daten in der Datenbank
        this.saveGame();
      } else if (result) {
        // Aktualisieren Sie die Spielerdaten im Spielobjekt
        this.game.players[playerId] = result.name ?? '';
        this.game.currentPlayerImgs[playerId] = result.img ?? '';
        // Speichern Sie die aktualisierten Daten in der Datenbank
        this.saveGame();
      }
    });
  }

}



