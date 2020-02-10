import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { MarcaService } from './../marca/marca.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-marca',
  templateUrl: './nova-marca.page.html',
  styleUrls: ['./nova-marca.page.scss'],
})
export class NovaMarcaPage implements OnInit {

  form: FormGroup;

  constructor(
    private loaderCtrl: LoadingController,
    private marcaService: MarcaService,
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

  novoMarca() {
    if (!this.form.valid) {
      return;
    }

    this.loaderCtrl.create({
      message: 'Cadastrando...'
    }).then(loadingEl => {
      loadingEl.present();
      this.marcaService.addMarca(
        this.form.value.nome
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/marca']);
      });
    })
  }

}
