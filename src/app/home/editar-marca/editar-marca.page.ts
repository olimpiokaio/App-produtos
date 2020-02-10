import { Component, OnInit } from '@angular/core';

import { MarcaService } from './../marca/marca.service';

import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Marca } from './../marca/marca.model';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.page.html',
  styleUrls: ['./editar-marca.page.scss'],
})
export class EditarMarcaPage implements OnInit {

  form: FormGroup;
  marca: Marca;
  marcaId: string;
  isLoading = false;
  private marcaSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private navCtrl: NavController,
    private router: Router,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('marcaId')) {
        this.navCtrl.navigateBack('/categoria');
        return;
      }
      this.marcaId = paramMap.get('marcaId');
      this.isLoading = true;
      this.marcaSub = this.marcaService
        .getMarca(paramMap.get('marcaId'))
        .subscribe(marca => {
          this.marca = marca;
          this.form = new FormGroup({
            nome: new FormControl(this.marca.nome,{
              updateOn: 'blur',
              validators: [Validators.required]
            })
          });
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.alertCtrl.create({
          header: 'Ocorreu um erro!', 
          message: 'Marca não encontrada, por favor tente mais tarde.',
          buttons: [{text: 'ok', handler: () => {
            this.router.navigate(['/categoria/']);
          }}]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    });
  }

  atualizarMarca() {
    if(!this.form.valid) {
      return
    }
    this.loadingController.create({
      message: 'Atualizando...'
    }).then(loadingEl => {
      loadingEl.present();
      this.marcaService.atualizarMarca(
        this.marca.id, 
        this.form.value.nome
      ).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/marca']);
      });
    })
  }

}
