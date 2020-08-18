import { Injectable } from '@angular/core';
import { Actions, createEffect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { ProductDataService } from '../product/service/product-data.service';
import { GlobalStoreActions } from './global-store';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuDataBuilderService } from '../shared/service/menu-data-builder.service';
import { Category } from '../models/product.models';
@Injectable()
export class RootEffects {
  paramInit$ = createEffect(() =>
  this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => this.pds.getInitData().pipe(
          tap(response => {
            response['icons'].forEach(jsonItem => {
              this.iconRegistry.addSvgIcon(jsonItem.designation, this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content));
            });
          }),
          map(response => {
              response["navMenuTree"] = this.mdbs.buildMenuTree(response['categories'].filter((cat:Category) => cat.isRoot))
            return GlobalStoreActions.LoadInitDataAction({payload:response})
                    })))))

  constructor(
    private actions$: Actions,
    private iconRegistry: MatIconRegistry ,
    private sanitizer: DomSanitizer,
    private mdbs: MenuDataBuilderService,
    private pds :ProductDataService ) {}

}
