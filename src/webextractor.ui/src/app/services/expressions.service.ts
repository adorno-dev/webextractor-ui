import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExpression } from '../domain/interfaces/iexpression';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExpressionsService {

  private endpoint: string = 'http://localhost:5000/api/expressions';

  constructor(private http: HttpClient) { }

  all(): Observable<IExpression[]> {
    return this.http.get<IExpression[]>(this.endpoint);
  }

  create(expression: IExpression) : Observable<Object> {
    return this.http.post(this.endpoint, expression)
  }

  delete(id: string) : Observable<Object> {
    return this.http.delete(`${this.endpoint}/${id}`);
  }

}
