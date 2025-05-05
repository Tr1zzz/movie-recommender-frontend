import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'movies', loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule) },
  { path: 'series', loadChildren: () => import('./features/series/series.module').then(m => m.SeriesModule) },
  { path: 'search', loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
