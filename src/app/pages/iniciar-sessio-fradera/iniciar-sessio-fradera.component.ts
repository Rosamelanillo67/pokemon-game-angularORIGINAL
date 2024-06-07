import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iniciar-sessio-fradera',
  templateUrl: './iniciar-sessio-fradera.component.html',
  styleUrls: ['./iniciar-sessio-fradera.component.css']
})
export class IniciarSessioFraderaComponent {
  jugador: string = '';
  puntos: number = 0;

  iniciarJuego() {
    if (this.jugador && this.puntos >= 0) {
      console.log('Jugador:', this.jugador);
      console.log('Puntos:', this.puntos);
    } else {
      alert('Por favor, ingresa todos los datos correctamente.');
    }
  }
}
