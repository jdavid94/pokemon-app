import { Routes } from '@angular/router';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pokemon-table', pathMatch: 'full' },
  { path: 'pokemon-table', component: PokemonTableComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent }
];
