import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';
import { SigmaRoutingModule } from './sigma-routing.module';
import { DialogAnimationsExample } from './dialog/dialog.component';


@NgModule({
  declarations: [
    GraficaComponent,
    DialogAnimationsExample
  ],
  imports: [
    CommonModule,
    SigmaRoutingModule,

  ]
})
export class SigmaModule { }
