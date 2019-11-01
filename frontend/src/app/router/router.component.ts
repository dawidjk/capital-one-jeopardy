import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ResultComponent } from '../result/result.component';

const routes: Routes = [
  { path: '', component: SearchbarComponent },
  { path: '**', redirectTo: 'results' },
  { path: 'search', component: SearchbarComponent },
  { path: 'results', component: ResultComponent },
  { path: 'results/:id', component: ResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
