import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Individu} from '../../model/individu';
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class IndividuService {

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  private individuUrl = '//localhost:8080/individus';

  getAll(): Observable<any> {
    return this.http.get(this.individuUrl);
  }

  saveIndividu(individu: Individu): Observable<Individu> {
    return this.http.post(this.individuUrl, JSON.stringify(individu), this.httpOptions)
      .pipe(
        tap((individu: Individu) => console.log(`added individu w/ id=${individu.nom}`)),
        catchError(this.handleError<Individu>('addIndividu'))
      )

    };


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
