import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILink } from '../domain/interfaces/ilink';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LinksService {

  private endpoint: string = 'http://localhost:5000/api/links';

  constructor(private http: HttpClient) { }

  all(): Observable<ILink[]> {
    return this.http.get<ILink[]>(this.endpoint);
  }

  allFromSite(siteId: string, page: number = 1): Observable<Object> {
    return this.http.get<Object>(`${this.endpoint}/site/${siteId}/page/${page}`);
  }

  get(id: string): Observable<ILink> {
    return this.http.get<ILink>(`${this.endpoint}/${id}`);
  }

  getValues(id: string, page: number = 1): Observable<Object> {
    return this.http.get<Object>(`${this.endpoint}/${id}/values/page/${page}`);
  }

  getSearchValues(id: string, search: string, expression: string, page: number = 1): Observable<Object> {
    console.log('--> ', id, search, expression, page);
    return this.http.get<Object>(`${this.endpoint}/${id}/search/values/page/${page}`, { headers: { "search": search, "expression": expression } });
  }

  getPreviewValues(id: string, expression: string, page: number = 1): Observable<Object> {
    return this.http.get<Object>(`${this.endpoint}/${id}/preview/values/page/${page}`, { headers: { "expression": expression } });
  }

  create(link: ILink): Observable<Object> {
    return this.http.post(this.endpoint, link)
  }

  delete(id: string): Observable<Object> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

}
