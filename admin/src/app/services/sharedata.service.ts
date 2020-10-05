import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  AccountInfoSource: Observable<any>;
  private acountInfo: BehaviorSubject<any>;

  constructor() {

    this.acountInfo = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.AccountInfoSource = this.acountInfo.asObservable();

  }

  shareAccountInfo(data: any) {
    this.acountInfo.next(data);
  }
}
