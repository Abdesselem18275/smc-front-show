import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlerService   {

  constructor() { }

  set(key: string , value: string) {
     localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }
  check(key: string) {
    return this.get(key) === null ? false : true;
  }
  getAll() {
    const archives = {};
    Object.keys(localStorage).forEach(key => {
      archives[key] = localStorage.getItem(key);
    });
    return archives;
  }

  deleteAll() {
    localStorage.clear();

    }

loadLocalStorage(data) {
  if (data['token']) {
    this.set('token', data['token']);
  }
  const account_data = data['account'] ? data['account'] : data;
  Object.keys(account_data).forEach(key => {
    this.set(key, account_data[key]);
  });
  Object.keys(account_data['profile']).forEach( key => {
    this.set(key, account_data['profile'][key]);
  });
}
}
