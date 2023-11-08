import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { DialogSelectImageComponent } from '../dialog-select-image/dialog-select-image.component';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name:string = '';
  game: Game;
  newPlayerImg: string = '';
  
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>,public dialog: MatDialog){
    this.game = new Game();

  }

  ngOnInit(): void {
    console.log(this.game)
  }

  onNoClick(){
    this.dialogRef.close()
  }

openImageSelectDialog(): void {
  const dialogRef = this.dialog.open(DialogSelectImageComponent, {
    width: '250px',
    data: { images: this.game.playersImg } // Bilder vom models game.ts werden als data übergeben an dialog-select-image    
  });

  dialogRef.afterClosed().subscribe(result => { 
    if (result) { //der result kommt von dialog-select-image und ist der string als pfad;
      this.newPlayerImg = result; // Nehmen Sie das ausgewählte Bild auf
      console.log(result)
    }
  });
}

}
