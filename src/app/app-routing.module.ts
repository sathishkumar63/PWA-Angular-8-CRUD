import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloading } from './core/custom-preloading/app-custom-preloading';

const routes: Routes = [
  {
    path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    runGuardsAndResolvers: 'always', data: { preload: true }
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // <-- debugging purposes only
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    preloadingStrategy: AppCustomPreloading
  })],
  exports: [RouterModule]
  // providers: [AppCustomPreloading]
})
export class AppRoutingModule { }
