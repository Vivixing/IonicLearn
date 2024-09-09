import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'personaje/:id',
    loadChildren: () => import('./pages/pagina2/pagina2.module').then( m => m.Pagina2PageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./pages/pagina1/pagina1.module').then( m => m.Pagina1PageModule)
  },
  {
    path: 'lugar/:id',
    loadChildren: () => import('./pages/pagina3/pagina3.module').then( m => m.Pagina3PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
