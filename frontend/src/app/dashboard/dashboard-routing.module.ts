import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TermComponent } from './term/term.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AcronymComponent } from './acronym/acronym.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'term', component: TermComponent },
      { path: 'acronym', component: AcronymComponent },
      { path: 'dictionary', component: DictionaryComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
  ]},
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
