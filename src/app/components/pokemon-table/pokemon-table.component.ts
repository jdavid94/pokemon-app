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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  selectedType: string = '';
  types: string[] = [];
  limit: number = 50;
  offset: number = 0;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemons(this.limit, this.offset);
    this.loadPokemonTypes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadPokemons(this.paginator.length, this.offset);
    });
  }

  loadPokemonTypes(): void {
    this.pokemonService.getPokemonTypes().subscribe({
      next: (types) => {
        this.types = types;
      },
      error: (error) => {
        console.error('Error loading Pokemon types:', error);
      },
    });
  }

  loadPokemons(limit: number, offset: number): void {
    this.pokemonService.getPokemonList(limit, offset).subscribe({
      next: (data) => {
        this.pokemonData = data;
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
    this.updateFilter();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTypeFilter(): void {
    this.updateFilter();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateFilter(): void {
    this.dataSource.filterPredicate = (data) => {
      const searchTermMatch = data.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase());
      const typeMatch = this.selectedType ? data.types.some((type: string) =>
              type.toLowerCase() === this.selectedType.trim().toLowerCase()
          )
        : true;
      return searchTermMatch && typeMatch;
    };
    this.dataSource.filter =
      this.searchTerm.trim().toLowerCase() +
      this.selectedType.trim().toLowerCase();
  }
}
