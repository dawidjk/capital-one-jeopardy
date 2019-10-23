import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../models/clue';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
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

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.random = false;
      this.options.category = parseInt(
        this.route.snapshot.paramMap.get('id'),
        10
      );
    } else {
      this.random = true;
    }
    this.drawCard();
  }

  public settings() {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: '350px',
      data: { options: this.options }
    });

    dialogRef.afterClosed().subscribe(result => {
      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      if (result.options.min_date != null) {
        result.options.min_date = formatDate(result.options.min_date, format, locale);
      }
      if (result.options.max_date != null) {
        result.options.max_date = formatDate(result.options.max_date, format, locale);
      }
      
      this.options = result.options;
      this.random = false;
      this.resetCard();
    });
  }

  public nextCard(): void {
    if (this.currentCard < this.clue.length - 3) {
      this.currentCard += 1;
    } else {
      this.drawCard();
      this.currentCard += 1;
    }
  }

  public prevCard(): void {
    if (this.currentCard > 0) {
      this.currentCard -= 1;
    }
  }

  private resetCard(): void {
    this.clue = [];
    this.drawCard();
  }

  private formatClue(clue: Clue): Clue {
    clue.answer = clue.answer.replace(/<\/?[^>]+(>|$)/g, '');
    clue.airdate = clue.airdate.split('T')[0];
    clue.category.title = clue.category.title.toUpperCase();

    return clue;
  }

  private drawCard(): void {
    if (this.random) {
      this.apiService.getRandom(1).subscribe(clues => {
        clues.forEach(clue => {
          if (
            clue.invalid_count !== null ||
            clue.invalid_count > 0 ||
            clue.category === null ||
            clue.answer.length === 0 ||
            clue.question.length === 0
          ) {
            this.drawCard();
          } else {
            clue = this.formatClue(clue);
            this.clue.push(clue);
          }
        });
      });
    } else {
      this.options.offset += 1;
      this.apiService.getClue(this.options, 1).subscribe(clues => {
        clues.forEach(clue => {
          if (
            clue.invalid_count !== null ||
            clue.invalid_count > 0 ||
            clue.category === null ||
            clue.answer.length === 0 ||
            clue.question.length === 0
          ) {
            this.drawCard();
          } else {
            clue = this.formatClue(clue);
            this.clue.push(clue);
          }
        });
      });
    }
  }
}
