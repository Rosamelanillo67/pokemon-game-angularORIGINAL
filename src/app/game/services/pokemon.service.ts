import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Pokemon, Shapes, Shape, ShapePreview } from '../interfaces/pokemon.interface';
import { environment } from 'src/environments/environment';
import { getRandomItem, removeRandomItem } from 'src/app/helpers/random.helper';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  private url: string = environment.pokeApiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getShape(shapeName: string): Observable<Shape> {
    return this._http.get<Shape>(`${ this.url }/pokemon-shape/${ shapeName }`);
  }
  // get shapePreview list
  getShapes(): Observable<Shapes> {
    return this._http.get<Shapes>(`${ this.url }/pokemon-shape`);
  }
  getPokemon(name: string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`${ this.url }/pokemon/${ name }`);
  }

  // lenght is the number of the random pokemon array length
  async getRandomPokemons(length: number): Promise<Pokemon[]> {
    const shapes: ShapePreview[] = (await firstValueFrom(this.getShapes())).results;

    const shape = await firstValueFrom(this.getShape(getRandomItem(shapes).name));

    let randomPokemons: Pokemon[] = [];
    let count = 0;
    while (count < length) {
      const randomPokemonName = removeRandomItem(shape.pokemon_species).name;
      console.log('pokemon removed:', randomPokemonName);
      const randomPokemon = await firstValueFrom(this.getPokemon(randomPokemonName));

      if (randomPokemon.sprites.other?.dream_world.front_default) {
        randomPokemons.push(randomPokemon);
        count++;
      } else {
        console.log('pokemon has not svg image', randomPokemon.sprites.other);
      }
    }
    return randomPokemons;
  }

}
