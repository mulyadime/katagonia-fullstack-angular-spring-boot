import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TermService } from 'src/app/__services/term.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Term } from 'src/app/_models/term';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {

  formTerm: FormGroup;
  termId: number;
  isUpdate: boolean = false;
  termList;
  rowCount: number;

  constructor(
    private _fb: FormBuilder,
    private activatedRoute: Router,
    private svcTerm: TermService,
  ) { }

  ngOnInit(): void {
    this.formTerm = this._fb.group({
      name: new FormControl('', Validators.required),
      translation: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
    });

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

  getDataById(item: number) {
    this.svcTerm.findOne(item).subscribe(
      res => {
        this.isUpdate = true;
        this.termId = res.id;
        this.patchTerm(res);
      },
      err => { console.log(err) }
    );
  }

  patchTerm(item: any): void {
    this.formTerm.setValue({
      name: item.name,
      translation: item.translation,
      category: item.category,
      language: item.language
    });
  }

  save(): void {
    if (this.isUpdate) {
      this.svcTerm.update(this.termId, this.formTerm.value).subscribe(
        res => {
          this.formTerm.reset();
          this.getData();
        },
        err => { console.log(err); }
      );
    } else {
      this.svcTerm.create(this.formTerm.value).subscribe(
        res => {
          this.formTerm.reset();
          this.getData();
        },
        err => { console.log(err); }
      );
    }
  }

  remove(item: any): void {
    this.svcTerm.remove(item).subscribe(
      res => {
        this.getData();
      },
      err => { console.log(err); }
    );
  }

  goToCategory(): void {
    this.activatedRoute.navigate(['category']);
  }

  dashboard(): void {
    this.activatedRoute.navigate([''])
  }

}
