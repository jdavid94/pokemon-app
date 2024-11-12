import { provideRouter, RouterModule, Routes } from '@angular/router';
import { PokemonTableComponent } from './components/pokemon-table/pokemon-table.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export const routes: Routes = [
  { path: '', redirectTo: 'pokemon-table', pathMatch: 'full' },
  { path: 'pokemon-table', component: PokemonTableComponent },
  { path: 'pokemon/:name', component: PokemonDetailComponent }
];

export const appRoutingProviders = [
  importProvidersFrom(
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule),
    provideRouter(routes)
];
