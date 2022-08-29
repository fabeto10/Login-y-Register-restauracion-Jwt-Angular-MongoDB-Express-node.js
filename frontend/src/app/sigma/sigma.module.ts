import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficaComponent } from './grafica/grafica.component';

import { SigmaRoutingModule } from './sigma-routing.module';


@NgModule({
  declarations: [
    GraficaComponent
  ],
  imports: [
    CommonModule,
    SigmaRoutingModule,

  ]
})
export class SigmaModule { }
