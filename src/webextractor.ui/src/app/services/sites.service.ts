import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ISite } from '../domain/interfaces/isite';

@Injectable()
export class SitesService {

  private endpoint: string = 'http://localhost:5000/api/sites';

  constructor(private http: HttpClient) { }

  all(): Observable<ISite[]> {
    return this.http.get<ISite[]>(this.endpoint);
  }

  get(id: string) : Observable<ISite> {
    return this.http.get<ISite>(`${this.endpoint}/${id}`);
  }

  create(site: ISite) : Observable<Object> {
    return this.http.post(this.endpoint, site)
  }

  delete(id: string) : Observable<Object> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

}
