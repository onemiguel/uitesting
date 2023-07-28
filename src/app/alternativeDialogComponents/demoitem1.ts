import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'demo-item-1',
  template: 
  '<p>Timestamp component created: {{timestamp}}</p>' +
  '<p>Timestamp now: {{ realtimenow }}</p>' +
  '<p>Component Age: {{componentAge}}</p>' +
  '<p><a routerLink = "/demoitem2" routerLinkActive="active" ariaCurrentWhenActive="page">Click here to go to the next item</a></p>'
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
  ngOnInit(): void {
    this.timestamp = new Date(); // Set it to now
  }

}