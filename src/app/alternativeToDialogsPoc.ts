import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: 'alternative-to-dialogs-poc',
  templateUrl: 'alternativeToDialogsPoc.html',
  styleUrls: [ 'app-main.component.css']
})
export class AlternativeToDialogsPoc implements OnInit {
  
  constructor(private dialog:MatDialog, private router:Router) {}
  
  canDeactivate() : Observable<boolean> | boolean {
    if(this.openingDialog) {
      this.openingDialog = false;
      return true;
    }
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
  private openingDialog:boolean = false;
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

  openDialog(link:string) : void {
    this.openingDialog = true;
    this.router.navigateByUrl(link);
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
  private handlers: Map<Route, DetachedRouteHandle> = new Map();

  constructor() { }

  public shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    if(_route.data.save) {
      return true; // Only save the snapshot if it is marked as such
    } else {
      return false;
    }
  }

  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    if (!route.routeConfig) return;
    this.handlers.set(route.routeConfig, handle);
  }

  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers.get(route.routeConfig);
  }

  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig || !this.handlers.has(route.routeConfig)) return null;
    return this.handlers.get(route.routeConfig)!;
  }

  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if(future.data?.type == 'dialog') {
      curr.data['save'] = true;
    }
    return future.routeConfig === curr.routeConfig;
  }

}