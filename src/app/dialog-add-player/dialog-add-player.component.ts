import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name:string = '';
  game: Game;
  newPlayerImg: string = '';
  
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>,){
    this.game = new Game();

  }
  ngOnInit(): void {
    console.log(this.game)
  }
  onNoClick(){
    this.dialogRef.close()
  }
}
