import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../__services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private activatedRoute: Router,
    private svcToken: TokenService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.svcToken.logout();
    this.activatedRoute.navigate(['login']);
  }

}
