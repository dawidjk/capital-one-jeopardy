import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() category: string;
  @Input() difficulty: number;
  @Input() question: string;
  @Input() answer: string;
  @Input() airdate: string;
}
