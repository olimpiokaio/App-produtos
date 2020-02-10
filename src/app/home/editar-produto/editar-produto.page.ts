import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './../produto.service';
import { Produto } from './../produto/produto.model';

import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { Marca } from '../marca/marca.model';
import { Categoria } from '../categoria/categoria.model';

import { CategoriaService } from  './../categoria/categoria.service';
import { MarcaService } from './../marca/marca.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
})
export class EditarProdutoPage implements OnInit {

  form: FormGroup;
  produto: Produto;
  produtoId: string;
  isLoading = false;
  private produtoSub: Subscription;
  imageUrl: any;

  marcas: Marca[];
  private marcasSub: Subscription;

  categorias: Categoria[];
  private categoriaSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private produtoService: ProdutoService,
    private navCtrl: NavController,
    private router: Router,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private sanitizer: DomSanitizer // camera capacitor
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('produtoId')) {
        this.navCtrl.navigateBack('/produto/');
        return;
      }
      this.produtoId = paramMap.get('produtoId');
      this.isLoading = true;
      this.produtoSub = this.produtoService
        .getProduto(paramMap.get('produtoId'))
        .subscribe(produto => {
          this.produto = produto;
          this.form = new FormGroup({
            nome: new FormControl(this.produto.nome,{
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            categoria: new FormControl(this.produto.categoria,{
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            marca: new FormControl(this.produto.marca,{
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            preco: new FormControl(this.produto.preco,{
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)]
            })
          });
          this.imageUrl = produto.imageUrl;
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.alertCtrl.create({
          header: 'Ocorreu um erro!', 
          message: 'O produto não foi encontrado, por favor tente mais tarde.',
          buttons: [{text: 'ok', handler: () => {
            this.router.navigate(['/produto/']);
          }}]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    });
    defineCustomElements(window);

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

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 55,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    this.imageUrl = image.dataUrl;
  }

  atualizarProduto() {
    if(!this.form.valid) {
      return
    }
    this.loadingController.create({
      message: 'Atualizando Produto...'
    }).then(loadingEl => {
      loadingEl.present();
      this.produtoService.atualizaPruduto(
        this.produto.id, 
        this.form.value.nome, 
        this.form.value.categoria,
        this.form.value.marca,
        this.form.value.preco,
        this.imageUrl
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/produto']);
      });
    })
  }

}
