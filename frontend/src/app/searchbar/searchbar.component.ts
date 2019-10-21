import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter, debounceTime, finalize } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Category } from '../models/category';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  searchbarController = new FormControl();
  options: Category[] = [];
  filteredOptions: Observable<Category[]>;
  categoryOffset = 0;
  categoryCount = 100;
  totalToLoad = 10;
  moneyVal = Math.floor(Math.random() * 100) * 10;
  toastDuration = 5;

  constructor(private apiService: ApiService, private router: Router, private snackBar: MatSnackBar) {
    for (; this.categoryOffset < this.totalToLoad; ++this.categoryOffset) {
      this.apiService
        .getCategories(
          this.categoryCount,
          this.categoryOffset * this.categoryCount
        )
        .subscribe(categories => {
          categories.forEach(category => {
            this.options.push(category);
          });
        });
    }
  }

  async ngOnInit() {
    this.filteredOptions = this.searchbarController.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => (typeof value === 'string' ? value : value.title)),
      map(title => (title ? this._filter(title) : this.options.slice()))
    );
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.title : undefined;
  }

  searchCategory(category: string) {
    const filterValue = category.toLowerCase();

    const chosen = this.options.filter(
      option => option.title.toLowerCase().indexOf(filterValue) === 0
    );

    if (chosen.length > 0) {
      this.router.navigate(['/results', chosen[0].id]);
    } else {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: this.toastDuration * 1000,
      });
    }
  }

  randomSearch() {
    this.router.navigate(['/results']);
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(
      option => option.title.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
