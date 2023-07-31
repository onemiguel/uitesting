import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routerTransition } from './app-main.animation';

@Component({
  selector: 'app-main-component',
  templateUrl: 'app-main.component.html',
  styleUrls: ['app-main.component.css'],
  animations: [routerTransition],
})
export class AppMainComponent implements OnInit {
  ngOnInit(): void {}

  public links:{ name:string, path:string }[] = [];
  constructor(private router:Router) { 
    router.config.forEach(c=>{
      if(c.data?.name) {
        this.links.push({ name: c.data.name, path: `/${c.path}`});
      }
    });
  }

  getState(routerOutlet: RouterOutlet) {
    console.log(`getState returned ${routerOutlet.activatedRouteData.type}`);
    return routerOutlet.activatedRouteData.type; 
  }
}

@Component({
  selector: 'app-home-page',
  template: '<h2>Select a POC above</h2>'
})
export class AppHomePage {}

