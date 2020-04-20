import { Injectable } from "@angular/core";
import {
  API_KEY,
  API_SEARCH_URL,
  DEFAULT_SEARCH_TERM,
  DEFAULT_SEARCH_LIMIT,
  DEFAULT_SEARCH_OFFSET
} from "./giphy.config";
import { HttpClient } from "@angular/common/http";
import {
  map,
  tap,
  switchMap,
  withLatestFrom,
  catchError
} from "rxjs/operators";
import { GiphyResponse } from "./giphy.model";
import { Observable, BehaviorSubject, combineLatest, of } from "rxjs";

const giphyUrl = `${API_SEARCH_URL}?q=${DEFAULT_SEARCH_TERM}&api_key=${API_KEY}&limit=${DEFAULT_SEARCH_LIMIT}&offset=${DEFAULT_SEARCH_OFFSET}`;

@Injectable({
  providedIn: "root"
})
export class GiphyService {
  private actualPageBS = new BehaviorSubject(0);
  private searchTermBS = new BehaviorSubject(DEFAULT_SEARCH_TERM);
  private limitBS = new BehaviorSubject(DEFAULT_SEARCH_LIMIT);
  
  actualPage$ = this.actualPageBS.asObservable();
  searchTerm$ = this.searchTermBS.asObservable();
  limit$ = this.limitBS.asObservable();

  // giphyResponse$ = this.http.get(giphyUrl);

  /*giphyResponse$ = this.actualPage$.pipe(
    switchMap( 
      actualPage => this.http.get( this.getUrl({offset: actualPage} ) )
    )
  )*/

  giphyResponse$ = combineLatest([
    this.searchTerm$,
    this.actualPage$, 
    this.limit$
  ]).pipe(
    switchMap( 
      ([term, actualPage, limit]) => 
      this.http.get( this.getUrl({
        term, actualPage, limit
      } ) )
    )
  )

  gifs$ = this.giphyResponse$.pipe(
    map( (response: GiphyResponse) => response.data )
  );

  totalResults$ = this.giphyResponse$.pipe(
    map( (response: GiphyResponse) => response.pagination.total_count )
  );

  totalPages$ = this.totalResults$.pipe(
    withLatestFrom( this.limit$),
    map( ( [totalResoults, limit] ) => Math.ceil(totalResoults / limit))
  )

  constructor(private http: HttpClient) {}

  private getUrl( params: any ){
    let term = params.term || DEFAULT_SEARCH_TERM, 
        limit = params.limit || DEFAULT_SEARCH_LIMIT, 
        actualPage = params.actualPage || DEFAULT_SEARCH_OFFSET;

    return `${API_SEARCH_URL}?q=${term}&api_key=${API_KEY}&limit=${limit}&offset=${actualPage * DEFAULT_SEARCH_LIMIT}`;
  }

  movePage(num: number){
    this.actualPageBS.next(
      this.actualPageBS.getValue()+num
    ) 
  }

  searchTerm( term:string ){
    this.searchTermBS.next( term );
    this.actualPageBS.next(0)
  }
  
  limitChange( limit:number ){
    this.limitBS.next(limit);
    this.actualPageBS.next(0)
  }
}
