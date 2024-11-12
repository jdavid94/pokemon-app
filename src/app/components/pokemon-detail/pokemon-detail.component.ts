import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatCardModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name !== null) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }
}
