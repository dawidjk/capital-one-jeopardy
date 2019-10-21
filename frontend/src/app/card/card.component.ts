import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  category = 'Dogs';
  difficulty = 500;
  question = 'What is my favorite dog?';
  answer = 'Siberian Husky';
  airdate = '11/20/1999';

  constructor() { }

  ngOnInit() {
  }

}
