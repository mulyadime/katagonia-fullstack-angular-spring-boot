import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TermComponent } from './term/term.component';
import { CategoryComponent } from './category/category.component';
import { AcronymComponent } from './acronym/acronym.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    TermComponent,
    CategoryComponent,
    AcronymComponent,
    DictionaryComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DashboardRoutingModule,
    AutocompleteLibModule
  ],
})
export class DashboardModule { }
