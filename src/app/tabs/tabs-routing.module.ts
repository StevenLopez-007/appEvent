import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
// import { EscanerGuard } from '../../guards/escaner.guard';
import { AuthGuard } from '../../guards/authGuard';
import { ScanGuardGuard } from '../../guards/scan-guard.guard';
import { ScanDesactivateGuard } from '../../guards/scan-desactivate.guard';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate:[AuthGuard],
    // canActivateChild:[EscanerGuard],
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path:'tab4',
        canActivate:[ScanGuardGuard],
        canDeactivate:[ScanDesactivateGuard],
        loadChildren:()=>import('../validate-entry/validate-entry.module').then(m=>m.ValidateEntryPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
