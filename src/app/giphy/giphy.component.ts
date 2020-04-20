import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { GiphyService } from "./giphy.service";
import {
  API_SEARCH_URL,
  DEFAULT_SEARCH_TERM,
  API_KEY,
  DEFAULT_SEARCH_LIMIT
} from "./giphy.config";
import { Gif, GiphyResponse } from "./giphy.model";

@Component({
  selector: "app-giphy",
  templateUrl: "./giphy.component.html",
  styleUrls: ["./giphy.component.css"]
})
export class GiphyComponent {
  // searchTerm: string = DEFAULT_SEARCH_TERM;
  //limit: number = DEFAULT_SEARCH_LIMIT;
  searchTerm$: Observable<string> = this.giphyService.searchTerm$;
  limit$: Observable<number> = this.giphyService.limit$;
  gifs$: Observable<Gif[]> = this.giphyService.gifs$;
  totalResults$: Observable<Number> = this.giphyService.totalResults$;
  totalPages$: Observable<Number> = this.giphyService.totalPages$;
  actualPage$: Observable<Number> = this.giphyService.actualPage$;

  constructor(private giphyService: GiphyService) {}

  movePage( num: number){
    this.giphyService.movePage(num);
  }

  limitChange(num: number){
    this.giphyService.limitChange(num);    
  }

  searchChange(term: string){
    this.giphyService.searchTerm(term);
  }
}
