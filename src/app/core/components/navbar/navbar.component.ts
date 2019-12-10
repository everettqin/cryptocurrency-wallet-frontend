import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location
} from '@angular/common';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private tokenService: AngularTokenService
  ) {
    this.location = location;
  }

  signOut() {
    this.tokenService
      .signOut()
      .pipe(tap(() => this.router.navigate(['/outside/auth/sign-in'])))
      .subscribe(() => {});
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
}
