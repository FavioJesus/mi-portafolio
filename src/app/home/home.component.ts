import { Component } from '@angular/core';

/**
 * Componente "vacio" para la ruta raiz '/'.
 * El contenido del portafolio se renderiza directamente desde AppComponent
 * (rama @else cuando showRoutedPage() es false), por lo que este componente
 * solo existe para que el router/SSR tenga una ruta que resolver en '/'.
 */
@Component({
  selector: 'app-home',
  template: '',
})
export class HomeComponent {}
