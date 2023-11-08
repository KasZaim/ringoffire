import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-select-image',
  templateUrl: './dialog-select-image.component.html',
  styleUrls: ['./dialog-select-image.component.scss']
})
export class DialogSelectImageComponent implements OnInit {
  selectedImage: string = '';


  constructor(
    public dialogRef: MatDialogRef<DialogSelectImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onImageSelect(image: string): void {
    this.selectedImage = image; //parameter wird der variable selected image übergeben;
  }

  onConfirmSelect(): void { //beim bestätigen wird der dialog geschlossen und der bildpfad weitergegeben an Dialogaddplayercomponent
    this.dialogRef.close(this.selectedImage);
    console.log(this.selectedImage)
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
