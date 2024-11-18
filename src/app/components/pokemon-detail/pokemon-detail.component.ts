import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Invalid Pokemon ID';
      return;
    }
    this.pokemonService.getPokemonDetails(id).subscribe({
      next: (data: any) => {
        this.pokemon = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load Pokemon Details.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/pokemon-table']);
  }
}
