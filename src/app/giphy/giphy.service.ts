import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import {
  API_KEY,
  API_SEARCH_URL,
  DEFAULT_SEARCH_TERM,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_SEARCH_OFFSET,
} from './giphy.config';
import { GiphyResponse, Gif } from './giphy.model';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private actualPageBS: BehaviorSubject<number> = new BehaviorSubject(0);
  private searchTermBS: BehaviorSubject<string> = new BehaviorSubject(
    DEFAULT_SEARCH_TERM
  );
  private limitBS: BehaviorSubject<number> = new BehaviorSubject(
    DEFAULT_SEARCH_LIMIT
  );

  get actualPage$(): Observable<number> {
    return this.actualPageBS.asObservable();
  }
  get searchTerm$(): Observable<string> {
    return this.searchTermBS.asObservable();
  }
  get limit$(): Observable<number> {
    return this.limitBS.asObservable();
  }

  giphyResponse$ = combineLatest([
    this.searchTerm$,
    this.actualPage$,
    this.limit$,
  ]).pipe(
    switchMap(([term, actualPage, limit]) =>
      this.http.get(this.getUrl({ term, actualPage, limit }))
    )
  );

  get firstPage$(): Observable<boolean> {
    return this.actualPage$.pipe(map((vl) => vl === 0));
  }
  get lastPage$(): Observable<boolean> {
    return combineLatest([this.actualPage$, this.totalPages$]).pipe(
      map(([acPg, tpg]) => acPg === tpg)
    );
  }

  get gifs$(): Observable<Gif[]> {
    return this.giphyResponse$.pipe(
      map((response: GiphyResponse) => response.data)
    );
  }

  get totalResults$(): Observable<any> {
    return this.giphyResponse$.pipe(
      map((response: GiphyResponse) => response.pagination.total_count)
    );
  }

  get totalPages$(): Observable<number> {
    return this.totalResults$.pipe(
      withLatestFrom(this.limit$),
      map(([totalResoults, limit]) => Math.ceil(totalResoults / limit))
    );
  }

  constructor(private http: HttpClient) {}

  private getUrl(params: any) {
    let term = params.term || DEFAULT_SEARCH_TERM,
      limit = params.limit || DEFAULT_SEARCH_LIMIT,
      actualPage = params.actualPage || DEFAULT_SEARCH_OFFSET;

    return `${API_SEARCH_URL}?q=${term}&api_key=${API_KEY}&limit=${limit}&offset=${
      actualPage * DEFAULT_SEARCH_LIMIT
    }`;
  }

  movePage(num: number) {
    this.actualPageBS.next(this.actualPageBS.getValue() + num);
  }

  searchTerm(term: string) {
    this.searchTermBS.next(term);
    this.actualPageBS.next(0);
  }

  limitChange(limit: number) {
    this.limitBS.next(limit);
    this.actualPageBS.next(0);
  }
}
