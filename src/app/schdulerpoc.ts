import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scheduler-poc-component',
  templateUrl: 'schedulerpoc.html',
  styleUrls: ['app-main.component.css'],
})
export class SchedulerPoc implements OnInit {
  public scheduleType: string = 'interval';
  public interval = new ScheduleInterval(723000000000);
  public timeOfDay = new TimeOfDay('03:00');

  ngOnInit(): void {}
}

export class ScheduleInterval {
  public day: string = '0';
  public hour: string = '0';
  public minute: string = '0';

  public get ticks(): number {
    return (
      ((+this.day * 24 + +this.hour) * 3600 + +this.minute * 60) * 10000000
    );
  }
  public toString(): number {
    return this.ticks;
  }
  constructor(ticks: number) {
    ticks = ticks / 10000000;
    this.minute = `${Math.floor((ticks % 3600) / 60)}`;
    this.hour = `${Math.floor(ticks / 3600)}`;
    this.day = '0';
    if (+this.hour > 24) {
      this.day = `${Math.ceil((+this.hour - 24) / 24)}`;
      this.hour = '23';
    }
  }
}

export class TimeOfDay {
  public hour: number = 0;
  public minutes: number = 0;
  constructor(input: string) {
    let parsed = input.split(':');
    if (parsed.length == 2) {
      this.hour = +parsed[0].trim();
      this.minutes = +parsed[1].trim();
    }
  }
  public toString(): string {
    return `${this.getStringValue(this.hour)}:${this.getStringValue(
      this.minutes
    )}`;
  }

  private getStringValue(num: number, len: number = 2): string {
    return `000000000000000000000000000000000${num}`.slice(-len);
  }
}

export class Interval extends Object {}
