import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';
import { DialogSelectImageComponent } from '../dialog-select-image/dialog-select-image.component';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  public player: { name: string; img: string; availableImgs: any } = {
    name: '', img: '',
    availableImgs: ''
  };

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,public dialog:MatDialog // Hier empfangen Sie die Daten
  ) {
    if (data) {
      this.player = {
        name: data.name || '',
        img: data.img || '',
        availableImgs: data.availableImgs || []
      }; // Initialisieren Sie das player-Objekt mit den übergebenen Daten
    }
  }
  ngOnInit(): void {
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.player);
    console.log(this.player)
  }
  onDelete(): void {
    // Bestätigungsdialog vor dem Löschen anzeigen oder direkt löschen
    if (confirm('Are you sure you want to delete this player?')) {
      this.dialogRef.close({ delete: true }); // Senden Sie ein Objekt mit einem 'delete' Flag zurück
    }
  }

  openImageSelectDialog(): void {
    const dialogRef = this.dialog.open(DialogSelectImageComponent, {
      width: '500px',
      data: { images: this.player.availableImgs } // Stellen Sie sicher, dass availableImages die Liste der Bilder enthält
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.player.img = result; // Nehmen Sie das ausgewählte Bild auf
      }
    });
  
  }
}
