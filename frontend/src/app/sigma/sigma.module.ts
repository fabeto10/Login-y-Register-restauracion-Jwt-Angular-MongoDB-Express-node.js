import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';
import { SigmaRoutingModule } from './sigma-routing.module';
import { DialogAnimationsExample } from './dialog/dialog.component';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
@NgModule({
  declarations: [
    GraficaComponent,
    DialogAnimationsExample,
  ],
  imports: [
    CommonModule,
    SigmaRoutingModule,
    MatDialogModule
  ], 
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
})
export class SigmaModule { }
