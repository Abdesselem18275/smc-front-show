import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, map, first } from 'rxjs/operators';
import { ApiProfile, Profile } from 'src/app/models/account.models';
import { AppDataService } from 'src/app/shared/services/app-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountStateService {
  private readonly authProfileSubject = new BehaviorSubject<Profile>(null);

  constructor(
    private snakBar : MatSnackBar,
    private as : AuthService,
    private ads : AppDataService) { }

  get authProfile():Observable<Profile> {
    return this.authProfileSubject.asObservable()
  }

  setAuthProfile(payload:Profile):void {
    return this.authProfileSubject.next(payload)
  }

  toogleFavorite(id:number):void {
      let profile = this.authProfileSubject.getValue()
      let _favorites = profile.favorites

      if (_favorites.includes(id)) {
        _favorites = _favorites.filter( x => x !== id );
      } else {
        _favorites.push(id);
      }
      this.ads.patch<ApiProfile>(`/account/profiles/${profile.id}/`,JSON.stringify({
        favorites : _favorites
      })).pipe(
        first()
      ).subscribe((value:ApiProfile) => this.setAuthProfile(new Profile(value)))
      
  }

  login(payload:any):Observable<any> {
    return this.ads.post<ApiProfile>('/s-auth/',JSON.stringify(payload)).pipe(
      tap((value: ApiProfile )=> {
        const profile = new Profile(value)
        this.as.token = profile.authToken
        this.setAuthProfile(profile)
      }),
      catchError(async (err) =>  {
        console.warn(err);
      }))
  }

  createProfile(payload:any):Observable<any> {
    return this.ads.post<ApiProfile>('/profiles/',payload).pipe(
      tap((value: ApiProfile) => {
        const profile = new Profile(value)
        this.as.token = profile.authToken
        this.setAuthProfile(profile)
      }),
      catchError(async (err) => console.warn(err)))
  }

  updateProfile(payload):Observable<any> {
    const profile = this.authProfileSubject.getValue()
    return this.ads.patch<ApiProfile>(`/profiles/${profile.id}/`,payload).pipe(
      map((value: ApiProfile) => {
        const profile = new Profile(value)
        this.setAuthProfile(profile)
      }),
      catchError(async (err) =>  alert('Failure')))
  }
}
