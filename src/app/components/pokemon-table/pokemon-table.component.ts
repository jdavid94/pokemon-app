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

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemons(50, 0);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadPokemons(
        this.paginator.pageSize,
        this.paginator.pageIndex * this.paginator.pageSize
      );
    });
  }

  loadPokemons(limit: number, offset: number): void {
    this.pokemonService.getPokemonList(50, 0).subscribe(
      (data) => {
        console.log(data);
        this.pokemonData = data;
        this.totalPokemons = data.count;
        this.dataSource.data = this.pokemonData.map((pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type: any) => type.type.name),
          sprite: pokemon.sprites.front_default,
        }));
      },
      (error) => {
        console.error('Error al cargar los Pokémon:', error);
      }
    );
  }

  navigateToDetail(name: string): void {
    this.router.navigate(['/pokemon', name]);
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
