import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AcronymService } from 'src/app/__services/acronym.service';

@Component({
  selector: 'app-acronym',
  templateUrl: './acronym.component.html',
  styleUrls: ['./acronym.component.scss']
})
export class AcronymComponent implements OnInit {

  form: FormGroup;
  acronymId: number;
  acronymList;
  rowCount: number = 0;
  isUpdate: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private activatedRoute: Router,
    private svcAcronym: AcronymService,
  ) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      indonesia: new FormControl('', Validators.required),
      english: new FormControl('', Validators.required),
    });

    this.getData();

  }

  getData() {
    this.svcAcronym.findAll().subscribe(
      res => {
        this.acronymList = res;
        this.rowCount = res.length;
        this.isUpdate = false;
      },
      err => { console.log(err) }
    );
  }

  getDataById(item: number) {
    this.svcAcronym.findOne(item).subscribe(
      res => {
        this.isUpdate = true;
        this.acronymId = res.id;
        this.patchTerm(res);
      },
      err => { console.log(err) }
    );
  }

  patchTerm(item: any): void {
    this.form.setValue({
      name: item.name,
      category: item.category,
      indonesia: item.indonesia,
      english: item.english
    });
  }

  save(): void {
    if (this.isUpdate) {
      this.svcAcronym.update(this.acronymId, this.form.value).subscribe(
        res => {
          this.form.reset();
          this.getData();
        },
        err => { console.log(err); }
      );
    } else {
      this.svcAcronym.create(this.form.value).subscribe(
        res => {
          this.form.reset();
          this.getData();
        },
        err => { console.log(err); }
      );
    }
  }

  remove(item: any): void {
    this.svcAcronym.remove(item).subscribe(
      res => {
        this.getData();
      },
      err => { console.log(err); }
    );
  }

  dashboard(): void {
    this.activatedRoute.navigate([''])
  }

}
