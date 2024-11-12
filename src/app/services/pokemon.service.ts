import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

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

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }
}
