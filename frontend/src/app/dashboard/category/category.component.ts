import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermService } from 'src/app/__services/term.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  termList;
  rowCount: number = 0;

  constructor(
    private activatedRoute: Router,
    private svcTerm: TermService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.svcTerm.findAll().subscribe(
      res => {
        this.termList = res;
        this.rowCount = res.length;
      },
      err => { console.log(err) }
    );
  }

  goToTerm(): void {
    this.activatedRoute.navigate(['term']);
  }

  dashboard(): void {
    this.activatedRoute.navigate([''])
  }

}
