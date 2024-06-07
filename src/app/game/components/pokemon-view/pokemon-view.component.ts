import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styles: [
    `img {
      filter: brightness(0);
      /* width: 275px;
      height: 200px; */
    }`,
    `.cover { object-fit: cover; }`,
    `.show { filter: brightness(1); }`
  ]
})
export class PokemonViewComponent implements OnInit {

  @Input() url: string | undefined;
  @Input() show: boolean | undefined;
  @Input() width: number | undefined;
  @Input() height: number | undefined;
  @Input() adjust: boolean | undefined;

  private isOriginalSize: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onImageDoubleClick(event: any): void {
    const imageElement = event.target;
    if (this.isOriginalSize) {
      imageElement.style.backgroundColor = 'red';
      imageElement.style.width = '100px';
      imageElement.style.height = '100px';
    } else {
      imageElement.style.backgroundColor = 'white';
      imageElement.style.width = `${this.width}px`;
      imageElement.style.height = `${this.height}px`;
    }
    this.isOriginalSize = !this.isOriginalSize;
  }
}
