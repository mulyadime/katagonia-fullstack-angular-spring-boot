import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  constructor(
    private activatedRoute: Router
  ) { }

  ngOnInit(): void {
  }

  dashboard(): void {
    this.activatedRoute.navigate([''])
  }

}
