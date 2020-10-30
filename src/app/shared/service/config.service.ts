import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {AppDataService} from './app-data.service';
import { take } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MenuDataBuilderService } from './menu-data-builder.service';
import { Category } from 'src/app/models/product.models';
import { GlobalStoreActions } from 'src/app/root-store/global-store';
import { PROFILE_ID } from 'src/app/injectables';
import { Profile } from 'src/app/models/account.models';
import { EMPTY } from 'rxjs';
import { UserStoreActions } from 'src/app/root-store/user-store';



@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(    
    @Inject(PROFILE_ID) private profileId: string,
    private iconRegistry: MatIconRegistry ,
    private sanitizer: DomSanitizer,
    private mdbs: MenuDataBuilderService,
    private store$: Store<any>,
    private ads : AppDataService ) { }

  loadInitials(): Promise<void| Object> {
    return this.ads.get<any>('/initData/').pipe(take(1)).toPromise().then((response : any) => {
      console.warn(response)
      response['icons'].forEach(jsonItem => {
        this.iconRegistry.addSvgIcon(jsonItem.designation, this.sanitizer.bypassSecurityTrustResourceUrl(jsonItem.content));
      });
      response['navMenuTree'] = this.mdbs.buildMenuTree(response['categories'].filter((cat:Category) => cat.isRoot))
      this.store$.dispatch(GlobalStoreActions.LoadInitDataAction({payload:response}))
    });
  }
  loadProfile(): Promise<void| Object>  {

    return localStorage.getItem(this.profileId) ? 
    this.ads.get<Profile>(`/profile/${localStorage.getItem(this.profileId)}/`).pipe(take(1)).toPromise().then((profile : Profile) => {
      console.warn(profile)
      this.store$.dispatch(UserStoreActions.LoadUserAction({payload:profile}))
    }) : EMPTY.toPromise()
  }
}
