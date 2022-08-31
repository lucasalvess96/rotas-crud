import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, retry, map} from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface Hero {
  id: number;
  name: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  baseUrl: string = 'http://localhost:3000/heroList/';

  constructor(private http: HttpClient) { }

  /**
   * method GET(getAll)
  **/
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.baseUrl)
      .pipe(retry(3), catchError(this.handleError));
  }

  /**
   * method GET(id)
  **/
  getHero(id: number | string) {
    return this.getHeroes().pipe(
      map((heroes: Hero[]) => heroes.find(hero => hero.id === +id)!)
    );
  }

  /**
   * method POST
  **/
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * method PUT
  **/
  updateHero(hero: Hero): Observable<Hero> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    return this.http.put<Hero>(this.baseUrl + hero.id, hero, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * method DELETE
  **/
  deleteHero(id: number): Observable<unknown> {
    const url = `${this.baseUrl}/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
  * method SEARCH
  **/
  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    const options = term ? { params: new HttpParams().set('name', term) } : {};

    return this.http
      .get<Hero[]>(this.baseUrl, options)
      .pipe(catchError(this.handleError));
  }


  /**
  * error handling
  **/
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('um error ocorreu:', error.error);
    } else {
      console.error(
        `Backend retornou codigo ${error.status}, body era: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo ruím aconteceu; por favor, tente novamente mais tarde.')
    );
  }

}
