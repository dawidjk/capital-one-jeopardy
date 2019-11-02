import { Component, OnInit, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Clue } from '../models/clue';
import { MatDialog } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import { formatDate } from '@angular/common';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LocalStorageService } from '../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNoFavoritesomponent } from '../snackbar-no-favorites/snackbar-no-favorites.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  clue: Clue[] = [];
  favorites: Clue[] = [];
  favoritesKey = 'favorites';
  currentCard = 0;
  loadedFavorite = false;
  lastClueCount = -1;
  random = true;
  noCardsLeft = false;
  options = {
    offset: 0,
    category: null,
    value: null,
    min_date: null,
    max_date: null
  };
  toastDuration = 3;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private cRef: ChangeDetectorRef
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
    this.favorites = this.localStorageService.getFavorites(this.favoritesKey);
  }

  public toggleFavorite() {
    if (this.isFavorite()) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  }

  public isFavorite() {
    return this.favorites.indexOf(this.clue[this.currentCard]) !== -1;
  }

  private addFavorite() {
    if (this.clue[this.currentCard] === null) {
      return;
    }
    this.favorites.push(this.clue[this.currentCard]);
    this.localStorageService.addFavorite(this.favorites, this.favoritesKey);
  }

  private removeFavorite() {
    const index = this.favorites.indexOf(this.clue[this.currentCard], 0);

    if (index > -1) {
      this.favorites.splice(index, 1);

      if (this.loadedFavorite) {
        this.clue = this.favorites;
        if (this.currentCard >= this.clue.length) {
          this.currentCard = this.clue.length - 1;
        }

        if (this.favorites.length === 0) {
          this.exitFavorites();
        }
      }
    }

    this.localStorageService.addFavorite(this.favorites, this.favoritesKey);
  }

  public loadFavorites() {
    this.favorites = this.localStorageService.getFavorites(this.favoritesKey);

    if (this.favorites.length === 0) {
      this.snackBar.openFromComponent(SnackbarNoFavoritesomponent, {
        duration: this.toastDuration * 1000
      });
    } else {
      this.clue = [];
      this.clue = this.favorites;
      this.loadedFavorite = true;
      this.currentCard = 0;
    }
  }

  public exitFavorites() {
    this.loadedFavorite = false;
    this.resetCard();
  }

  public settings() {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: '350px',
      data: { options: this.options }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      const format = 'yyyy-MM-dd';
      const locale = 'en-US';
      if (result.options.min_date != null) {
        result.options.min_date = formatDate(
          result.options.min_date,
          format,
          locale
        );
      } else if (result.options.max_date != null) {
        result.options.min_date = '1964-01-01';
      }
      if (result.options.max_date != null) {
        result.options.max_date = formatDate(
          result.options.max_date,
          format,
          locale
        );
      } else if (result.options.min_date != null) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        result.options.max_date = yyyy + '-' + mm + '-' + dd;
      }

      this.options = result.options;
      this.options.offset = 0;
      this.noCardsLeft = false;
      this.random = false;
      this.resetCard();
    });
  }

  public nextCard(): void {
    if (!this.loadedFavorite) {
      this.drawCard();
    }
    this.currentCard += 1;
    let clueMod = 1;
    if (this.clue.length === this.lastClueCount) {
      clueMod = 0;
    }
    this.currentCard %= this.clue.length + clueMod;
    this.lastClueCount = this.clue.length;
  }

  public prevCard(): void {
    if (this.currentCard > 0) {
      this.currentCard -= 1;
    } else if (this.currentCard === 0) {
      this.currentCard = this.clue.length - 1;
    }
  }

  private resetCard(): void {
    this.clue = [];
    this.currentCard = 0;
    this.drawCard();
    this.cRef.detectChanges();
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
    } else if (!this.noCardsLeft) {
      this.apiService.getClue(this.options).subscribe(clues => {
        if (clues.length === 0) {
          if (this.currentCard >= this.clue.length) {
            this.currentCard = 0;
          }

          this.noCardsLeft = true;
          return;
        }
        for (let i = 0; i < clues.length; ++i) {
          this.options.offset += 1;
          if (
            clues[i].invalid_count !== null ||
            clues[i].invalid_count > 0 ||
            clues[i].category === null ||
            clues[i].answer.length === 0 ||
            clues[i].question.length === 0
          ) {
            this.drawCard();
          } else {
            this.clue.forEach(element => {
              if (element.category.id === clues[i].category.id) {
                return;
              }
            });
            clues[i] = this.formatClue(clues[i]);
            this.clue.push(clues[i]);
          }
        }
      });
    }
  }
}
