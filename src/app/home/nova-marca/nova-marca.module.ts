import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaMarcaPage } from './nova-marca.page';

const routes: Routes = [
  {
    path: '',
    component: NovaMarcaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaMarcaPage]
})
export class NovaMarcaPageModule {}
