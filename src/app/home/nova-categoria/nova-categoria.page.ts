import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { CategoriaService } from './../categoria/categoria.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.page.html',
  styleUrls: ['./nova-categoria.page.scss'],
})
export class NovaCategoriaPage implements OnInit {

  form: FormGroup;

  constructor(
    private loaderCtrl: LoadingController,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null ,{
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  novaCategoria() {
    if (!this.form.valid) {
      return;
    }
    this.loaderCtrl.create({
      message: 'Cadastrando...'
    }).then(loadingEl => {
      loadingEl.present();
      this.categoriaService.addCategoria(
        this.form.value.nome
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/categoria']);
      });
    })
  }

}
