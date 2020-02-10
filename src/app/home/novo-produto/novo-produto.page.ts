import { Component, OnInit } from '@angular/core';
import { Produto } from './../produto/produto.model';

import { LoadingController } from '@ionic/angular';
import { ProdutoService } from './../produto.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Subscription } from 'rxjs';
import { Marca } from '../marca/marca.model';
import { Categoria } from '../categoria/categoria.model';

import { CategoriaService } from  './../categoria/categoria.service';
import { MarcaService } from './../marca/marca.service';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.page.html',
  styleUrls: ['./novo-produto.page.scss'],
})
export class NovoProdutoPage implements OnInit {

  form: FormGroup;
  photo: SafeResourceUrl;
  imageUrl: any;

  marcas: Marca[];
  private marcasSub: Subscription;

  categorias: Categoria[];
  private categoriaSub: Subscription;

  constructor(
    private loaderCtrl: LoadingController,
    private produtoService: ProdutoService,
    private router: Router,
    private categoriaService: CategoriaService,
    private marcaService: MarcaService,
    private sanitizer: DomSanitizer // camera capacitor
  ) {}

  ngOnInit() {
    defineCustomElements(window);
    this.form = new FormGroup({
      nome: new FormControl(null ,{
        updateOn: 'change',
        validators: [Validators.required]
      }),
      categoria: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),
      marca: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.required]
      }),
      preco: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)]
      })
    });

    this.marcasSub = this.marcaService.marcas.subscribe(marcas => {
      this.marcas = marcas;
    });

    this.categoriaSub = this.categoriaService.categorias.subscribe(categorias => {
      this.categorias = categorias;
    });
  }

  ionViewWillEnter() {
    this.marcaService.fetchMarcas().subscribe();
    this.categoriaService.fetchCategorias().subscribe();
  }

  onNovaPizza() {
    if (!this.form.valid) {
      return;
    }
    this.loaderCtrl.create({
      message: 'Cadastrando Produto...'
    }).then(loadingEl => {
      loadingEl.present();
      this.produtoService.addProduto(
        this.form.value.nome,
        this.form.value.categoria,
        this.form.value.marca,
        +this.form.value.preco,
        this.imageUrl = this.photo && this.photo !== null ? this.photo : 'http://amarribo.org.br/wp-content/themes/wpbrasil-odin-3fa0943-child/assets/images/sem_imagem.jpg',
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/produto']);
      });
    })
  }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
  });

    this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    this.photo = image.dataUrl;
  }

}
