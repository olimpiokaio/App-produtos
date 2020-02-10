import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NovaCategoriaPage } from './nova-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: NovaCategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NovaCategoriaPage]
})
export class NovaCategoriaPageModule {}
