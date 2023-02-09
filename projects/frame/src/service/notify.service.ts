import { Injectable } from '@angular/core';
import { Subject, Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  protected _notifySubject = new Subject<any>();

  constructor() { }

  public notify(key: string, value?: any) {
    this._notifySubject.next({ key, value });
  }

  public get(key: string): Observable<any> {
    return this._notifySubject
      .asObservable()
      .pipe(
        filter(e => e.key === key),
        map(e => e.value)
      );
  }
}
