import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api/api.service";
import { switchMap } from "rxjs/operators"; // RxJS v6
import { ActivatedRoute } from "@angular/router";
import { Clue } from "../models/clue";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  clue: Clue;
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

  private drawCard() {
    if (this.random) {
      this.apiService.getRandom(1).subscribe(clues => {
        clues.forEach(clue => {
          this.clue = clue;
        });
      });
    } else {
      this.apiService.getClue(this.options, 1).subscribe(clues => {
        clues.forEach(clue => {
          this.clue = clue;
        });
      });
    }
  }
}
