import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoItem1 } from './alternativeDialogComponents/demoitem1';
import { DemoItem2 } from './alternativeDialogComponents/demoitem2';
import { AlternativeToDialogsPoc } from './alternativeToDialogsPoc';
import { AppHomePage } from './app-main.component';
import { NotFoundComponent } from './notfound';
import { PipelinePoc } from './pipelinepoc';
import { SchedulerPoc } from './schdulerpoc';


import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
  
@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('canDeactivate executed for: ' + state.url);
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

const routes: Routes = [
  { path: '', component: AppHomePage },
  { path: 'schedulerpoc', component: SchedulerPoc, data: { name: 'Detection Scheduler POC'} },
  { path: 'pipelinepoc', component: PipelinePoc, data: { name: 'Dev/Prod Pipeline POC'} },
  { path: 'alternativedialogpoc', component: AlternativeToDialogsPoc, canDeactivate: [CanDeactivateGuard], data: { name: 'Alternative to Dialogs POC'} },
  { path: 'demoitem1', component: DemoItem1, data: {type:'dialog'} },
  { path: 'demoitem2', component: DemoItem2, data: {type:'dialog'} },
  { path: '**', component: NotFoundComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

