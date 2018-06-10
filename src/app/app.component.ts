import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

export function hiddenState(name) {
  return state(name, style({
    opacity: 0,
    display: 'hidden',
    'z-index': -1
  }));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('load', [
      hiddenState('bg'),
      hiddenState('loader'),
      transition('void => bg', animate('0.3s 0.8s ease-in-out')),
      transition('void => loader', animate('0.3s 0.5s ease-in-out'))
    ])
  ]
})
export class AppComponent {

}
