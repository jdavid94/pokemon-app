import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap } from 'rxjs';
import { UrlConfig } from '../config/url.config';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = UrlConfig.pokemonUrl;

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((response: any) => {
          const requests = response.results.map((pokemon: any) =>
            this.http.get(pokemon.url).pipe(
              catchError((error) => {
                console.error('Error fetching Pokemon data:', error);
                throw error;
              })
            )
          );
          return forkJoin(requests);
        }),
        catchError((error) => {
          console.error('Error fetching Pokemon list:', error);
          throw error;
        })
      );
  }

  getPokemonDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon details:', error);
        throw error;
      })
    );
  }

  getPokemonTypes(): Observable<string[]> {
    return this.http
      .get<{ results: { name: string }[] }>(`${this.apiUrl}/type`)
      .pipe(
        map((response: { results: any[]; }) => response.results.map((type: { name: any; }) => type.name)),
        catchError((error) => {
          console.error('Error fetching Pokemon types:', error);
          throw error;
        })
      );
  }
}
