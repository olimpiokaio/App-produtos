import { Component, OnInit } from '@angular/core';

import { CategoriaService } from './../categoria/categoria.service';

import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Categoria } from './../categoria/categoria.model';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.page.html',
  styleUrls: ['./editar-categoria.page.scss'],
})
export class EditarCategoriaPage implements OnInit {

  form: FormGroup;
  categoria: Categoria;
  categoriaId: string;
  isLoading = false;
  private categoriaSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoriaService: CategoriaService,
    private navCtrl: NavController,
    private router: Router,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('categoriaId')) {
        this.navCtrl.navigateBack('/categoria');
        return;
      }
      this.categoriaId = paramMap.get('categoriaId');
      this.isLoading = true;
      this.categoriaSub = this.categoriaService
        .getCategoria(paramMap.get('categoriaId'))
        .subscribe(categoria => {
          this.categoria = categoria;
          this.form = new FormGroup({
            nome: new FormControl(this.categoria.nome,{
              updateOn: 'blur',
              validators: [Validators.required]
            })
          });
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.alertCtrl.create({
          header: 'Ocorreu um erro!', 
          message: 'Categoria não encontrado, por favor tente mais tarde.',
          buttons: [{text: 'ok', handler: () => {
            this.router.navigate(['/categoria/']);
          }}]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    });
  }

  atualizarCategoria() {
    if(!this.form.valid) {
      return
    }
    this.loadingController.create({
      message: 'Atualizando...'
    }).then(loadingEl => {
      loadingEl.present();
      this.categoriaService.atualizarCategoria(
        this.categoria.id, 
        this.form.value.nome
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/categoria']);
      });
    })
  }

}
