import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditarMarcaPage } from './editar-marca.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMarcaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarMarcaPage]
})
export class EditarMarcaPageModule {}
