import { Injectable } from '@angular/core';
import { Produto } from './produto/produto.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

interface ProdutoData {
  nome: string;
  categoria: string;
  marca: string;
  preco: number;
  imageUrl: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient
  ) {}

  private _produtos = new BehaviorSubject<Produto[]>([]);

  fetchProdutos() {
    return this.http
      .get<{[key: string]: ProdutoData}>('https://vendasprojeto-ef1f8.firebaseio.com/produtos.json')
      .pipe(map(resData => {
        const produtos = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            produtos
            .push(new Produto(
              key, 
              resData[key].nome, 
              resData[key].categoria,
              resData[key].marca,
              resData[key].preco,
              resData[key].imageUrl
              )
            );
          }
        }
        return produtos;
      }),
      tap(produtosRes => {
        this._produtos.next(produtosRes);
      })
    );
  }

  get produtos() {
    return this._produtos.asObservable();
  }

  getProduto(id: string) {
    return this.http
      .get<Produto>(`https://vendasprojeto-ef1f8.firebaseio.com/produtos/${id}.json`)
      .pipe(
        map(produtoData => {
          return new Produto(
            id, 
            produtoData.nome, 
            produtoData.categoria,
            produtoData.marca,
            produtoData.preco,
            produtoData.imageUrl 
          );
        })
      );
  }

  addProduto(nome: string, categoria: string, marca: string, preco: number, imageUrl: any, ) {
    let generateId: string;
    const newProduto = new Produto(
      Math.random().toString(), 
      nome,
      categoria,
      marca,
      preco,
      imageUrl 
    );
    return this.http
      .post<{name: string}>('https://vendasprojeto-ef1f8.firebaseio.com/produtos.json', 
      { ...newProduto, id: null })
      .pipe(
        switchMap(resData => {
          generateId = resData.name;
          return this.produtos;
        }),
        take(1),
        tap(produtos => {
          newProduto.id = generateId;
          this._produtos.next(produtos.concat(newProduto));
        })
      );
  }

  atualizaPruduto(produtoId: string, nome: string, categoria: string, marca: string, preco: number, imageUrl: any) {
    let atualProduto: Produto[];
    return this.produtos.pipe(
      take(1), switchMap(produtos => {
        if (!produtos || produtos.length <= 0) {
          return this.fetchProdutos();
        } else {
          return of(produtos);
        }
      }),
      switchMap(produtos => {
        const atualProdutoIndex = produtos.findIndex(pl => pl.id === produtoId);
        atualProduto = [...produtos];
        const oldProduto = atualProduto[atualProdutoIndex];
        atualProduto[atualProdutoIndex] = new Produto(
          oldProduto.id,
          nome,
          categoria,
          marca,
          preco,
          imageUrl
        );
        return this.http.put(
          `https://vendasprojeto-ef1f8.firebaseio.com/produtos/${produtoId}.json`,
          { ...atualProduto[atualProdutoIndex], id: null}
        );
      }),
      tap(() => {
        this._produtos.next(atualProduto);
      }));
  }


  deletaProduto(produtoId: string) {
    // logica para deletar pizza
    return this.http.delete(
        `https://vendasprojeto-ef1f8.firebaseio.com/produtos/${produtoId}.json`
    ).pipe(switchMap(() => {
        return this.produtos;
    }),
    take(1),
    tap(produtos => {
        this._produtos.next(produtos.filter(b => b.id !== produtoId));
    }));
  }
}