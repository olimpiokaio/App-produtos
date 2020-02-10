import { Component, OnInit } from '@angular/core';

import { Marca } from './marca.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';

import { MarcaService } from './marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.page.html',
  styleUrls: ['./marca.page.scss'],
})
export class MarcaPage implements OnInit {

  marcas: Marca[];
  isLoading = false;
  private marcasSub: Subscription;

  constructor(
    private marcaService: MarcaService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.marcasSub = this.marcaService.marcas.subscribe(marcas => {
      this.marcas = marcas;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.marcaService.fetchMarcas().subscribe(() => {
      this.isLoading = false;
    });
  }

  editarMarca(marcaId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'editar-marca', marcaId]);
    console.log('Editar marca ' + marcaId);
  }

  deletarMarca(marcaId: string, slidingBooking: IonItemSliding) {
    slidingBooking.close();
    // adiciona um o spinner
    this.loadingController.create({
      message: 'Deletando...'
    }).then(loadingEl => {
      loadingEl.present();
      // deleta marca pelo id
      this.marcaService.deletaMarca(marcaId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if(this.marcasSub) {
      this.marcasSub.unsubscribe();
    }
  }

}
