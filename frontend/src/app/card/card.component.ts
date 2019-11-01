import { Component, Input } from '@angular/core';
import { Clue } from '../models/clue';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() clue: Clue;
}
