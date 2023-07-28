import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: 'alternative-to-dialogs-poc',
  templateUrl: 'alternativeToDialogsPoc.html'
})
export class AlternativeToDialogsPoc implements OnInit {
  
  constructor(private dialog:MatDialog) {}
  
  canDeactivate() : Observable<boolean> | boolean {
    const confirmDialog = this.dialog.open(ExitConfirmationDialog, { disableClose: true});
    return confirmDialog.afterClosed().pipe(
      map(response => {
        if(response) {
          return true;
        } else {
          return false;
        }
      }
    ));
  }

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

@Component({
  selector: 'exit-confirm-dialog',
  template: '<mat-card><mat-card-title>Exit Confirmation</mat-card-title>' +
    '<mat-card-content class="dialogContent">Are you sure you want to exit?</mat-card-content>' + 
    '<mat-dialog-actions class="dialogActions"><button mat-stroked-button [mat-dialog-close] class="cancelButton" cdkFocusInitial>No</button><button mat-stroked-button color="primary" [mat-dialog-close]="true" class="submitButton">Yes</button></mat-dialog-actions></mat-card>'
})
export class ExitConfirmationDialog {}

export class PocReuseStrategy implements RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    throw new Error("Method not implemented.");
  }
  store(route: ActivatedRouteSnapshot,handle: DetachedRouteHandle|null): void {
    throw new Error("Method not implemented.");
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    throw new Error("Method not implemented.");
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null {
    throw new Error("Method not implemented.");
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot,curr: ActivatedRouteSnapshot): boolean {
    throw new Error("Method not implemented.");
  }

}