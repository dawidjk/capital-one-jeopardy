import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './router/router.component';
import { ResultComponent } from './result/result.component';
import { SnackbarSearchComponent } from './snackbar-search/snackbar-search.component';
import { SnackbarNoFavoritesomponent } from './snackbar-no-favorites/snackbar-no-favorites.component';
import { CardComponent } from './card/card.component';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LocalStorageService } from './services/local-storage.service';
import { HammerJSConfig } from './hammer/hammer-jsconfig';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    ResultComponent,
    SnackbarSearchComponent,
    SnackbarNoFavoritesomponent,
    CardComponent,
    OptionsDialogComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    SnackbarSearchComponent,
    OptionsDialogComponent,
    SnackbarNoFavoritesomponent
  ],
  providers: [MatNativeDateModule, LocalStorageService, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerJSConfig,
}],
  bootstrap: [AppComponent]
})
export class AppModule {}
