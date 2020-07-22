import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/__services/search.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchRequest } from 'src/app/_models/search-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reactiveForm: FormGroup;
  name = '';
  keyword = 'translationName';
  historyHeading: string = 'Recently selected.'
  placeholder: string = "Enter text you want searching..";

  search: string = '';
  isLoadingResult: boolean = false;
  countriesReactive;

  searchRequest: SearchRequest;

  isTableResult: boolean = false;
  isTableList;
  
  constructor(
    private _fb: FormBuilder,
    private svcSearch: SearchService
  ) { }

  ngOnInit() {
    this.reactiveForm = this._fb.group({
      name: [{value: '', disabled: false}, Validators.required],
      lang: new FormControl(false),
    });
  }

  submit(): void {
    this.searchRequest = new SearchRequest(
      this.isEnglish,
      this.reactiveForm.get('name').value.termName
    );
    console.log(this.searchRequest)
    this.svcSearch.postSearch(this.searchRequest).subscribe(
      result => {
        this.isTableResult = true;
        this.isTableList = result;
      }
    )
  }

  get isEnglish() {
    if (this.reactiveForm.get('lang').value === true) {
      return true
    }

    return false
  }

  get isIndo() {
    if (this.reactiveForm.get('lang').value === false) {
      return true
    }

    return false
  }

  get isName() {
    return this.reactiveForm.get('name').value;
  }

  getResponse(event) {
    this.isLoadingResult = true;
    this.searchRequest = new SearchRequest(
      this.isEnglish,
      event
    );

    this.svcSearch.postSearch(this.searchRequest).subscribe(
      result => {
        this.countriesReactive = result;
      }
    )
    this.isLoadingResult = false;
  }

}
