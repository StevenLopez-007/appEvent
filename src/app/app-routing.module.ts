import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authGuard';
import { LoginGuard } from '../guards/loginGuard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'buscar-col-modal',
    canActivate:[AuthGuard],
    loadChildren: () => import('./buscar-col-modal/buscar-col-modal.module').then( m => m.BuscarColModalPageModule)
  },
  {
    path: 'login',
    canActivate:[LoginGuard],
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  },
  {
    path:'**',redirectTo:''
  },
  {
    path: 'ver-colaboradores',
    loadChildren: () => import('./ver-colaboradores/ver-colaboradores.module').then( m => m.VerColaboradoresPageModule)
  },
  {
    path: 'error-emails',
    loadChildren: () => import('./error-emails/error-emails.module').then( m => m.ErrorEmailsPageModule)
  },
  {
    path: 'sale-ticket',
    loadChildren: () => import('./sale-ticket/sale-ticket.module').then( m => m.SaleTicketPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales/sales.module').then( m => m.SalesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
