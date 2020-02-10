import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';

import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categorias: Categoria[];
  isLoading = false;
  private categoriaSub: Subscription;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.categoriaSub = this.categoriaService.categorias.subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.categoriaService.fetchCategorias().subscribe(() => {
      this.isLoading = false;
    });
  }

  editarCategoria(categoriaId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'editar-categoria', categoriaId]);
  }

  deletarCategoria(categoriaId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    // adiciona um o spinner
    this.loadingController.create({
      message: 'Deletando...'
    }).then(loadingEl => {
      loadingEl.present();
      // deleta categoria pelo id
      this.categoriaService.deletaCategoria(categoriaId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if(this.categoriaSub) {
      this.categoriaSub.unsubscribe();
    }
  }

}
