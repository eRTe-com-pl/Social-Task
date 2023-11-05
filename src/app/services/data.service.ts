import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from "../models/rayOfLight.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<Data[]>([]);

  setData(data: Data[]):void {
    this.dataSubject.next(data)
  }

  getData(): Observable<Data[]> {
    return this.dataSubject.asObservable();
  }

}
