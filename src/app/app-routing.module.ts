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
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate:[AuthGuard],
  },
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
  {
    path: 'options-sale',
    loadChildren: () => import('./options-sale/options-sale.module').then( m => m.OptionsSalePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./user-settings/user-settings.module').then( m => m.UserSettingsPageModule)
  },
  {
    path: 'options-profile-photo',
    loadChildren: () => import('./options-profile-photo/options-profile-photo.module').then( m => m.OptionsProfilePhotoPageModule)
  },
  {
    path: 'options-event',
    loadChildren: () => import('./options-event/options-event.module').then( m => m.OptionsEvent1PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
