import {Component, Output, EventEmitter, Input, Inject} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GraficaComponent } from '../grafica/grafica.component';
/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogAnimationsExample {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) {}


  }
