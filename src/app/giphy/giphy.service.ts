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
import { Observable, BehaviorSubject, combineLatest } from "rxjs";

const giphyUrl = `${API_SEARCH_URL}?q=${DEFAULT_SEARCH_TERM}&api_key=${API_KEY}&limit=${DEFAULT_SEARCH_LIMIT}&offset=${DEFAULT_SEARCH_OFFSET}`;

@Injectable({
  providedIn: "root"
})
export class GiphyService {
  giphyResponse$ = this.http.get(giphyUrl);
  constructor(private http: HttpClient) {}
}
