import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './router/router.component';
import { ResultComponent } from './result/result.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [AppComponent, SearchbarComponent, ResultComponent, SnackbarComponent],
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
    MatSnackBarModule
  ],
  entryComponents: [SnackbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
