import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/__services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userLoggedIn: string;

  constructor(
    private svcToken: TokenService
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = this.svcToken.getUser();
  }

}
