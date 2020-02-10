import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'produto', loadChildren: './home/produto/produto.module#ProdutoPageModule' },
  { path: 'novo-produto', loadChildren: './home/novo-produto/novo-produto.module#NovoProdutoPageModule' },
  { path: 'editar-produto/:produtoId', loadChildren: './home/editar-produto/editar-produto.module#EditarProdutoPageModule' },
  { path: 'categoria', loadChildren: './home/categoria/categoria.module#CategoriaPageModule' },
  { path: 'nova-categoria', loadChildren: './home/nova-categoria/nova-categoria.module#NovaCategoriaPageModule' },
  { path: 'editar-categoria/:categoriaId', loadChildren: './home/editar-categoria/editar-categoria.module#EditarCategoriaPageModule' },
  { path: 'marca', loadChildren: './home/marca/marca.module#MarcaPageModule' },
  { path: 'nova-marca', loadChildren: './home/nova-marca/nova-marca.module#NovaMarcaPageModule' },
  { path: 'editar-marca/:marcaId', loadChildren: './home/editar-marca/editar-marca.module#EditarMarcaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
