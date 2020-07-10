import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/__services/token.service';
import { Observable, concat, Subject, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Acronym } from 'src/app/_models/acronym';
import { AcronymService } from 'src/app/__services/acronym.service';
import { SearchService } from 'src/app/__services/search.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reactiveForm: FormGroup;
  name = '';
  keyword = 'termName';
  historyHeading: string = 'Recently selected.'
  placeholder: string = "Enter text you want searching..";

  search: string = '';
  isLoadingResult: boolean = false;
  countriesReactive: string[];
  
  constructor(
    private _fb: FormBuilder,
    private svcSearch: SearchService
  ) { }

  ngOnInit() {
    this.reactiveForm = this._fb.group({
      name: [{value: '', disabled: false}, Validators.required]
    });
  }

  submit() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
    }
  }

  getResponse(event) {
    this.isLoadingResult = true;
    this.svcSearch.getSearch(event).subscribe(
      result => {
        console.log(result);
        this.countriesReactive = result;
      }
    )
    this.isLoadingResult = false;
  }

}
