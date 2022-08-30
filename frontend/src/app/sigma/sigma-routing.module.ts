import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaComponent } from './grafica/grafica.component';

const routes: Routes = [
    {path: '', component: GraficaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigmaRoutingModule { }