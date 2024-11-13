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

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.pokemonService.getPokemonDetails(id).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/pokemon-table']);
  }
}
