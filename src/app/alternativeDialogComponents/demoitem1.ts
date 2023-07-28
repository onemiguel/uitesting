import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: 'demo-item-1',
  template: 
  '<p>Timestamp component created: {{timestamp}}</p>' +
  '<p>Timestamp now: {{ realtimenow }}</p>' +
  '<p>Component Age: {{componentAge}}</p>' +
  '<p><button mat-stroked-button (click)="location.back()">Close Dialog</button></p>'
})
export class DemoItem1 implements OnInit {
  public timestamp:Date;

  public get realtimenow(): string {
    return `${(new Date()).getTime()}`;
  }

  public get componentAge(): string {
    let now:Date = new Date();
    return `${now.getTime() - this.timestamp.getTime()}`;
  }

  constructor(public location: Location) {}
  ngOnInit(): void {
    this.timestamp = new Date(); // Set it to now
  }

}