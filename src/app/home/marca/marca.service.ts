import { Injectable } from '@angular/core';

import { Marca } from './marca.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

interface MarcaData {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(
    private http: HttpClient
  ) { }

  private _marca = new BehaviorSubject<Marca[]>([]);

  fetchMarcas() {
    return this.http
      .get<{[key: string]: MarcaData}>('https://vendasprojeto-ef1f8.firebaseio.com/produto-marca.json')
      .pipe(map(resData => {
        const marcas = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            marcas
            .push(new Marca(
              key, 
              resData[key].nome
              )
            );
          }
        }
        return marcas;
      }),
      tap(MarcasRes => {
        this._marca.next(MarcasRes);
      })
    );
  }

  get marcas() {
    return this._marca.asObservable();
  }

  getMarca(id: string) {
    return this.http
      .get<Marca>(`https://vendasprojeto-ef1f8.firebaseio.com/produto-marca/${id}.json`)
      .pipe(
        map(marcasData => {
          return new Marca(
            id, 
            marcasData.nome
          );
        })
      );
  }

  addMarca(marca: string) {
    let generateId: string;
    const newMarca = new Marca(
      Math.random().toString(), 
      marca
    );
    return this.http
      .post<{name: string}>('https://vendasprojeto-ef1f8.firebaseio.com/produto-marca.json', 
      { ...newMarca, id: null })
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.marcas;
        }),
        take(1),
        tap(marcas => {
          newMarca.id = generateId;
          this._marca.next(marcas.concat(newMarca));
        })
      );
  }

  atualizarMarca(marcaId: string, nome: string) {
    let atualMarca: Marca[];
    return this.marcas.pipe(
      take(1), switchMap(Marcas => {
        if (!Marcas || Marcas.length <= 0) {
          return this.fetchMarcas();
        } else {
          return of(Marcas);
        }
      }),
      switchMap(marcas => {
        const atualCartegoriaIndex = marcas.findIndex(pl => pl.id === marcaId);
        atualMarca = [...marcas];
        const oldMarca = atualMarca[atualCartegoriaIndex];
        atualMarca[atualCartegoriaIndex] = new Marca(
          oldMarca.id,
          nome
        );
        return this.http.put(
          `https://vendasprojeto-ef1f8.firebaseio.com/produto-marca/${marcaId}.json`,
          { ...atualMarca[atualCartegoriaIndex], id: null}
        );
      }),
      tap(() => {
        this._marca.next(atualMarca);
      }));
  }

  deletaMarca(marcaId: string) {
    // logica para deletar pizza
    return this.http.delete(
        `https://vendasprojeto-ef1f8.firebaseio.com/produto-marca/${marcaId}.json`
    ).pipe(switchMap(() => {
        return this.marcas;
    }),
    take(1),
    tap(marcas => {
        this._marca.next(marcas.filter(b => b.id !== marcaId));
    }));
  }

}
