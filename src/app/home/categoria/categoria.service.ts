import { Injectable } from '@angular/core';

import { Categoria } from './categoria.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

interface CategoriaData {
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient
  ) { }

  private _categoria = new BehaviorSubject<Categoria[]>([]);

  fetchCategorias() {
    return this.http
      .get<{[key: string]: CategoriaData}>('https://vendasprojeto-ef1f8.firebaseio.com/produto-categoria.json')
      .pipe(map(resData => {
        const categorias = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            categorias
            .push(new Categoria(
              key, 
              resData[key].nome
              )
            );
          }
        }
        return categorias;
      }),
      tap(categoriasRes => {
        this._categoria.next(categoriasRes);
      })
    );
  }

  get categorias() {
    return this._categoria.asObservable();
  }

  getCategoria(id: string) {
    return this.http
      .get<Categoria>(`https://vendasprojeto-ef1f8.firebaseio.com/produto-categoria/${id}.json`)
      .pipe(
        map(categoriasData => {
          return new Categoria(
            id, 
            categoriasData.nome
          );
        })
      );
  }

  addCategoria(categoria: string) {
    let generateId: string;
    const newCategoria = new Categoria(
      Math.random().toString(), 
      categoria
    );
    return this.http
      .post<{name: string}>('https://vendasprojeto-ef1f8.firebaseio.com/produto-categoria.json', 
      { ...newCategoria, id: null })
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.categorias;
        }),
        take(1),
        tap(categorias => {
          newCategoria.id = generateId;
          this._categoria.next(categorias.concat(newCategoria));
        })
      );
  }

  atualizarCategoria(categoriaId: string, nome: string) {
    let atualCategoria: Categoria[];
    return this.categorias.pipe(
      take(1), switchMap(categorias => {
        if (!categorias || categorias.length <= 0) {
          return this.fetchCategorias();
        } else {
          return of(categorias);
        }
      }),
      switchMap(categorias => {
        const atualCartegoriaIndex = categorias.findIndex(pl => pl.id === categoriaId);
        atualCategoria = [...categorias];
        const oldCategoria = atualCategoria[atualCartegoriaIndex];
        atualCategoria[atualCartegoriaIndex] = new Categoria(
          oldCategoria.id,
          nome
        );
        return this.http.put(
          `https://vendasprojeto-ef1f8.firebaseio.com/produto-categoria/${categoriaId}.json`,
          { ...atualCategoria[atualCartegoriaIndex], id: null}
        );
      }),
      tap(() => {
        this._categoria.next(atualCategoria);
      }));
  }

  deletaCategoria(categoriaId: string) {
    // logica para deletar pizza
    return this.http.delete(
        `https://vendasprojeto-ef1f8.firebaseio.com/produto-categoria/${categoriaId}.json`
    ).pipe(switchMap(() => {
        return this.categorias;
    }),
    take(1),
    tap(categorias => {
        this._categoria.next(categorias.filter(b => b.id !== categoriaId));
    }));
  }
  
}
