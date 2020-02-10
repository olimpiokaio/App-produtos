import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produto } from './../produto/produto.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';

import { ProdutoService } from './../produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {

  produtos: Produto[];
  isLoading = false;
  private produtoSub: Subscription;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.produtoSub = this.produtoService.produtos.subscribe(pizzas => {
      this.produtos = pizzas;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.produtoService.fetchProdutos().subscribe(() => {
      this.isLoading = false;
    });
  }

  editarProduto(produtoId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'editar-produto', produtoId]);
  }

  deletarProduto(produtoId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    // adiciona um o spinner
    this.loadingController.create({
      message: 'Deletando Produto...'
    }).then(loadingEl => {
      loadingEl.present();
      // deleta produto pelo id
      this.produtoService.deletaProduto(produtoId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if(this.produtoSub) {
      this.produtoSub.unsubscribe();
    }
  }

}
