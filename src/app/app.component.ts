import { Component, ElementRef, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('load', [
      state('fadeout', style({
        opacity: 0,
        display: 'hidden',
        'z-index': -1
      })),
      transition('void => fadeout', animate('0.3s 0.5s ease-in-out'))
    ])
  ]
})
export class AppComponent {

}
