import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api/api.service";
import { switchMap } from "rxjs/operators"; // RxJS v6
import { ActivatedRoute } from "@angular/router";
import { Clue } from "../models/clue";
import { CardComponent } from '../card/card.component';

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  clue: Clue[] = [];
  currentCard = 0;
  random = true;
  options = {
    offset: 0,
    category: null,
    value: null,
    min_date: null,
    max_date: null
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.has("id")) {
      this.random = false;
      this.options.category = parseInt(this.route.snapshot.paramMap.get("id"), 10);
    } else {
      this.random = true;
    }
    this.drawCard();
  }

  public nextCard() {
    console.log('next');
    if (this.currentCard < this.clue.length - 1) {
      this.currentCard += 1;
    } else {
      this.drawCard();
      this.currentCard += 1;
    }
  }

  public prevCard() {
    console.log('prev');
    if (this.currentCard > 0) {
      this.currentCard -= 1;
    }
  }

  private resetCard() {
    this.clue = [];
  }

  private drawCard() {
    if (this.random) {
      this.apiService.getRandom(1).subscribe(clues => {
        clues.forEach(clue => {
          if (clue.invalid_count > 0) {
            this.drawCard();
          } else {
            clue.airdate = clue.airdate.split('T')[0];
            this.clue.push(clue);
          }
        });
      });
    } else {
      this.apiService.getClue(this.options, 1).subscribe(clues => {
        clues.forEach(clue => {
          if (clue.invalid_count > 0) {
            this.drawCard();
          } else {
            clue.answer = clue.answer.replace(/<\/?[^>]+(>|$)/g, '');
            clue.airdate = clue.airdate.split('T')[0];
            this.clue.push(clue);
          }
        });
      });
    }
  }
}
