import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';

export interface Pokemon{
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

@Component({
  selector: 'app-pokemon-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './pokemon-table.component.html',
  styleUrl: './pokemon-table.component.scss',
})
export class PokemonTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'types', 'sprite'];
  dataSource = new MatTableDataSource<any>();
  pokemonData: any[] = [];
  totalPokemons: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  selectedType: string = '';
  types: string[] = ['Grass', 'Fire', 'Water', 'Electric', 'Bug', 'Normal'];
  limit : number = 50;
  offset : number = 0;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemons(this.limit, this.offset);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadPokemons(this.paginator.length, this.offset);
    });
  }

  loadPokemons(limit: number, offset: number): void {
    this.pokemonService.getPokemonList(limit, offset).subscribe({
      next: (data) => {
        this.pokemonData = data;
        this.totalPokemons = data.length;
        this.dataSource.data = this.pokemonData.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type: any) => type.type.name),
          sprite: pokemon.sprites.front_default,
        }));
      },
      error: (error) => {
        console.error('Error loading Pokemon:', error);
      },
    });
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/pokemon', id]);
  }

  applySearchFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTypeFilter(): void {
    if (this.selectedType) {
      this.dataSource.filterPredicate = (data, filter: string) => {
        return data.types.some((type: string) =>
          type.toLowerCase().includes(filter)
        );
      };
      this.dataSource.filter = this.selectedType.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
