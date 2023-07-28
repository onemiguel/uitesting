import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from './app-main.animation';

@Component({
  selector: 'app-main-component',
  templateUrl: 'app-main.component.html',
  styleUrls: ['app-main.component.css'],
  animations: [routerTransition],
})
export class AppMainComponent implements OnInit {
  ngOnInit(): void {}

  getState(routerOutlet: RouterOutlet) {
    return routerOutlet.activatedRouteData.state;
  }
}

@Component({
  selector: 'app-home-page',
  template: '<h2>Select a POC above</h2>'
})
export class AppHomePage {}

