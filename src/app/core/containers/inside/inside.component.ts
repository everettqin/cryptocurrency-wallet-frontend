import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

// Object-Path

// libs

import { AppBaseComponent } from '../../base';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent extends AppBaseComponent {
  ngOnInit() {}

  ngOnDestroy() {}ƒ
}
