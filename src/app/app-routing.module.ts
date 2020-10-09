import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/authGuard';
import { LoginGuard } from '../guards/loginGuard';
import { NetworkGuard } from '../guards/network.guard';
const routes: Routes = [
  {
    path: '',
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
  // {
  //   path:'adminCols',
  //   loadChildren:()=> import('./administrar-cols/administrar.module').then(m=>m.AdministrarColsComponentModule)
  // },
  // {
  //   path: 'validate-entry',
  //   canActivate:[AuthGuard,ScanGuardGuard],
  //   canDeactivate:[ScanDesactivateGuard],    
  //   loadChildren: () => import('./validate-entry/validate-entry.module').then( m => m.ValidateEntryPageModule)
  // },
  {
    path: 'admin-cols',
    loadChildren: () => import('./admin-cols/admin-cols.module').then( m => m.AdminColsPageModule)
  },
  {
    path: 'network-state',
    canDeactivate:[NetworkGuard],
    loadChildren: () => import('./network-state/network-state.module').then( m => m.NetworkStatePageModule)
  },
  {
    path:'**',redirectTo:''
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
