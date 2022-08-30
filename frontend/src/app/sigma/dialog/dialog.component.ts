import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'dialog',
  styleUrls: ['dialog.component.css'],
  templateUrl: 'dialog.component.html',
})
export class DialogAnimationsExample {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}