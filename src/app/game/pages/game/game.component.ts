import { Component, OnInit } from '@angular/core';
import { getRandomItem } from 'src/app/helpers/random.helper';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PlayerService } from '../../services/player.service';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  jugador: string = '';
  puntos: number = 0;

  constructor(
    private playerService: PlayerService,
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.playerService.resetGame();
    this.newGame();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as { jugador: string, puntos: number };
      this.jugador = state.jugador;
      this.puntos = state.puntos;
    }
  }

  loaded: boolean = false;
  private _selected: boolean = false;
  private _pokemonSelected: string = '';
  private _pokemons: Pokemon[] = [];
  private _pokemon!: Pokemon;

  get score(): number {
    return this.playerService.score;
  }

  get hearts(): Array<any> {
    return Array(this.playerService.lifes);
  }

  get selected(): boolean {
    return this._selected;
  }

  get pokemonSelected(): string {
    if (!this.selected) return '';
    return this._pokemonSelected;
  }

  get pokemonList(): Pokemon[] {
    return [...this._pokemons];
  }

  get urlImage(): string {
    return this._pokemon.sprites.other?.dream_world.front_default || '';
  }

  get pokemonName(): string {
    return this._selected ? this._pokemon.name : 'undefined';
  }

  onSelect(pokemonName: string) {
    this._pokemonSelected = pokemonName;
    this._selected = true;

    if (pokemonName === this._pokemon.name) {
      this.playerService.increasePoints();
    }

    if (pokemonName !== this._pokemon.name) {
      this.playerService.decreaseLifes();
      console.log('incorrect');
    }
  }

  // this function is executed every time the user clicks on next game
  async newGame() {
    this.loaded = false;
    this._selected = false;
    this._pokemons = await this.pokemonService.getRandomPokemons(4).catch(error => {
      console.log('Error: ', error);
      return [];
    });
    if (this._pokemons.length == 0) {
      this.newGame();
    } else {
      this._pokemon = getRandomItem(this._pokemons) || this._pokemons[0];
      console.log(this._pokemons, this._pokemon);
      this.loaded = true;
    }
  }
}
