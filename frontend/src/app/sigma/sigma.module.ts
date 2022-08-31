import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';
import { SigmaRoutingModule } from './sigma-routing.module';
import { DialogAnimationsExample } from './dialog/dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { BarrasComponent } from './barras/barras.component';
@NgModule({
  declarations: [
    GraficaComponent,
    DialogAnimationsExample,
    BarrasComponent,
  ],
  imports: [
    CommonModule,
    SigmaRoutingModule,
    MatDialogModule
  ], 
  providers: [
    {
      provide: MatDialogRef, 
      useValue: {hasBackdrop: false}
    }
  ],
})
export class SigmaModule { }
