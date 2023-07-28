import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { AppHomePage, AppMainComponent } from './app-main.component';

import { SchedulerPoc } from './schdulerpoc';
import { PipelinePoc } from './pipelinepoc';
import { NotFoundComponent } from './notfound';
import { AppRoutingModule, CanDeactivateGuard } from './app-routing.module';
import { AlternativeToDialogsPoc, ExitConfirmationDialog, PocReuseStrategy } from './alternativeToDialogsPoc';
import { RouteReuseStrategy } from '@angular/router';
import { DemoItem1 } from './alternativeDialogComponents/demoitem1';
import { DemoItem2 } from './alternativeDialogComponents/demoitem2';

@NgModule({
  declarations: [
    AppMainComponent,
    AppHomePage,
    NotFoundComponent,
    SchedulerPoc,
    PipelinePoc,
    AlternativeToDialogsPoc,
    DemoItem1,
    DemoItem2,
    ExitConfirmationDialog 
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    //{ provide: RouteReuseStrategy, useClass: PocReuseStrategy }
    CanDeactivateGuard
  ],
  bootstrap: [AppMainComponent],
})
export class AppModule {}
