import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LostAndFoundConfig } from '../lostandfound.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LostItemService {
  constructor(private http: HttpClient) {}

  public getAllLostItems(): Observable<any> {
    const url = LostAndFoundConfig.getPath() + '/LostItems';

    return this.http.get(url);
  }
  public deletelostitem(id: string): Observable<any> {
    const url = LostAndFoundConfig.getPath() + `/Lostitems/${id}`;

    return this.http.delete(url);
  }
  public addNewLostItem(data: object): Observable<any> {
    const url =  LostAndFoundConfig.getPath() + '/LostItems/add';

    return this.http.post(url, data);
  }
  public updatelostitem(data): Observable<any> {
    const url = LostAndFoundConfig.getPath() + `/LostItems/${data._id}`;
    // tslint:disable-next-line: no-trailing-whitespace
    
        // tslint:disable-next-line: align
        return this.http.put(url, data);

    }
}
